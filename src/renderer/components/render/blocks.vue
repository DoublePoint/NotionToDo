<template>
  <div>
    <!-- 
        **************
        Type: Official (supported by the official notion api)
        **************    
    -->
    <component v-if="isCustom" :is="customComponent" :block="block"></component>
    <!-- Pragraph -->
    <p v-else-if="block.type == 'paragraph' && block.paragraph.rich_text">
      <Txt :p="block.paragraph.rich_text" />
    </p>
    <!-- Headings -->
    <h1 v-else-if="block.type == 'heading_1' && block.heading_1.rich_text">
      <Txt :p="block.heading_1.rich_text" />
    </h1>
    <h2 v-else-if="block.type == 'heading_2' && block.heading_2.rich_text">
      <Txt :p="block.heading_2.rich_text" />
    </h2>
    <h3 v-else-if="block.type == 'heading_3' && block.heading_3.rich_text">
      <Txt :p="block.heading_3.rich_text" />
    </h3>
    <!-- Unordered list -->
    <li
      v-else-if="
        block.type == 'bulleted_list_item' && block.bulleted_list_item.rich_text
      "
    >
      <Txt :p="block.bulleted_list_item.rich_text" />
    </li>
    <!-- Todo list -->
    <div v-else-if="block.type == 'to_do' ">
      <input
        type="checkbox"
        :id="block.id"
        :value="block.to_do.rich_text[0]?.plain_text"
        :checked="block.to_do.checked"
        disabled="disabled"
      />
      <label><Txt :p="block.to_do.rich_text"/></label>
    </div>
    <!-- 
        **************
        Type: Unofficial (Not supported yet by the official notion api)
        **************    
    -->
    <!-- image -->

    <img
      v-else-if="block.type == 'u_image'"
      :src="block.src"
      style="object-fit:fill;max-width:100%; margin:auto; display:block; max-height:800px; margin-bottom:15px"
    />

    <!-- video Or embed -->
    <iframe
      style="max-width: 100%;border:none"
      class="overflow-hidden mx-auto"
      v-else-if="block.type == 'u_video' || block.type == 'u_embed'"
      :width="block.width"
      :height="block.height"
      :src="block.src"
    >
    </iframe>

    <!-- Drive -->
    <Drive v-else-if="block.type == 'u_drive'" :data="block.data" />

    <!-- Quote -->
    <Quote v-else-if="block.type == 'u_quote'" :data="block.u_quote.text" />

    <!-- Callout -->
    <Callout v-else-if="block.type == 'u_callout'">
      <template v-slot:icon>
        <img
          v-if="block.isImg === true"
          :src="block.icon"
          width="40"
          height="40"
          alt="icon"
        />
        <span v-else>{{ block.icon }}</span></template
      >
      <template v-slot:text><Txt :p="block.u_callout.text"/></template>
    </Callout>

    <!-- Divider -->
    <hr v-else-if="block.type == 'divider'" />

    <!-- Bookmark -->
    <Bookmark v-else-if="block.type == 'u_bookmark'" :data="block.data" />

    <!-- Code -->
    <Code
      v-else-if="block.type == 'u_code'"
      :language="block.language"
      :code="block.code"
    />
    <!-- Tweet -->
    <Tweet v-else-if="block.type == 'u_tweet'" :src="block.src" />
    <!-- File -->
    <File v-else-if="block.type == 'u_file'" :data="block.data" />
    <!-- Audio -->
    <Audio v-else-if="block.type == 'u_audio'" :data="block.data" />
    <!-- Equation -->
    <Math v-else-if="block.type == 'u_equation'" :data="block.data" />
  </div>
</template>

<script>
import Txt from "./blocks/Txt.vue";
import Quote from "./blocks/Quote.vue";
import Callout from "./blocks/Callout.vue";
import Bookmark from "./blocks/Bookmark.vue";
import Code from "./blocks/Code.vue";
import Tweet from "./blocks/Tweet.vue";
import File from "./blocks/File.vue";
import Audio from "./blocks/Audio.vue";
import Math from "./blocks/Math.vue";
import Drive from "./blocks/Drive.vue";

export default {
  components: {
    Txt,
    Quote,
    Callout,
    Bookmark,
    Code,
    Tweet,
    File,
    Audio,
    Math,
    Drive,
  },
  props: {
    block: Object,
    isCustom: Object,
  },
  computed: {
    customComponent() {
      return this.isCustom.componentName;
    },
  },
};
</script>
