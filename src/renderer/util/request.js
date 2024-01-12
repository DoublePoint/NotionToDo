import Setting from "../../setting"
import axios from '@/http/axios'
import * as dayjs from 'dayjs'

// const { Client } = require("@notionhq/client")


// Initializing a client
// const notion = new Client({
//   auth: Setting.NOTION_KEY,
// })


export async function GetPageChildren(pageId){
    let url = `api/v1/blocks/${pageId}/children?page_size=100`;
    let res = await axios.get(url, {});
    return res;
}
export async function GetPageProperty(pageId){
    let url = `api/v1/pages/${pageId}`;
    let res = await axios.get(url, {});
    return res;
}
export async function GetDatabaseItem(pageId){
    let url = `api/v1/databases/${pageId}/query`;
    let res = await axios.post(url, {});
    return res;
}
export async function GetTodayPage(pageId){
    let url = `api/v1/blocks/${pageId}/children?page_size=100`;
    let res = await axios.get(url, {});
    return res;
}


export async function GetToDayTodo(pageId){
    //console.log("开始获取首页所有Children");
    const pageChildrenRes = await GetPageChildren(pageId);
    // //console.log(pageChildrenRes);
    //console.log("开始获取TODO Galerry ID");
    const todoDatabasePageId = GetToDoDataBasePageId(pageChildrenRes);
    if(!todoDatabasePageId){
        console.error("未获取到TODO Galerry ID");
    }
    // //console.log(todoDatabasePageId);
    //console.log("开始获取TODO Galerry");
    const databaseItem = await GetDatabaseItem(todoDatabasePageId);
    //console.log(databaseItem);
    //console.log("开始获取当天的TODO Page ID");
    const todayPageId = GetTodayPageId(databaseItem)
    //console.log("开始获取当天的TODO Page");
    const todayPageChildrenRes = await GetTodayPage(todayPageId);
    //console.log(todayPageChildrenRes);
    //console.log(todayPageId);
    return todayPageChildrenRes
}

/**
 * 返回ToDoDataBase Page Id
 * @param {请求主页面Children返回结果} res 
 * @returns 
 */
function GetToDoDataBasePageId(res){
    const results = res.data.results;
    let toDoDataBasePageId= "";
    if(!results){
        return null;
    }
    results.forEach(element => {
        if(element.type=="child_database"){
            if(element.child_database.title=="ToDo")
                toDoDataBasePageId = element.id;
        }
    });

    return toDoDataBasePageId;
}

function GetTodayPageId(res){
    const results = res.data.results;
    let todayPageId= "";
    if(!results){
        return null;
    }
    const now = dayjs(dayjs().format("YYYYMMDD"));
    let selectDate;
    results.forEach(element => {
        selectDate = dayjs(element.properties.Date.date.start)
        // //console.log(`start:${element.properties.Date.date.start},now:${now},selectDate:${selectDate.format("YYYYMMDD")},Diff:${now.diff(selectDate, 'day')}`);
        if(now.diff(selectDate, 'day')==0){
            todayPageId = element.id;
        }
    });

    return todayPageId;
}



// export default notion