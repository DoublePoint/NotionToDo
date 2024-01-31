import axios from '@/http/axios'
import * as dayjs from 'dayjs'
import { logger } from '@/util/logger'
// const { Client } = require("@notionhq/client")


// Initializing a client
// const notion = new Client({
//   auth: Setting.NOTION_KEY,
// })


export async function GetPageChildren(pageId){
    let url = `v1/blocks/${pageId}/children?page_size=100`;
    let res = null;
    try {
        res = await axios.get(url, {});
    } catch (error) {
        logger.error(`Get page children error,${error}`)
    }
    return res;
}
export async function GetPageProperty(pageId){
    let url = `v1/pages/${pageId}`;
    let res = null;
    try {
        res = await axios.get(url, {});
    } catch (error) {
        logger.error(`Get page property error,${error}`)
    }
    return res;
}
export async function GetDatabaseItem(pageId){
    let url = `v1/databases/${pageId}/query`;
    let res = null;
    try {
        res = await axios.post(url, {});
    } catch (error) {
        logger.error(`Get database item error,${error}`)
    }
    return res;
}
export async function GetTodayPage(pageId){
    let url = `v1/blocks/${pageId}/children?page_size=100`;
    let res = null;
    try {
        res = await axios.get(url, {});
    } catch (error) {
        logger.error(`Get today page error,${error}`)
    }
    return res;
}


export async function GetTodayTodo(pageId){
    try {
        const pageChildrenRes = await GetPageChildren(pageId);
        if(!pageChildrenRes){
            return {
                data:{msg: "GetPageChildren error"}
            }
        }
        const todoDatabasePageId = GetToDoDataBasePageId(pageChildrenRes);
        if(!todoDatabasePageId){
            return {
                data:{msg: "未获取到TODO Galerry ID"}
            }
        }
        const databaseItem = await GetDatabaseItem(todoDatabasePageId);
        const {todayPageId,todayPageTitle} = GetTodayPageId(databaseItem)
        if(!todayPageId){
            return {
                data:{msg: "未获取到今天的待办，请检查是否录入待办。"}
            }
        }
        const todayPageChildrenRes = await GetTodayPage(todayPageId);
        return {data:todayPageChildrenRes,todayPageTitle}
    } catch (error) {
        logger.error(error);
        return error;
    }
    
}

/**
 * 返回ToDoDataBase Page Id
 * @param {请求主页面Children返回结果} res 
 * @returns 
 */
function GetToDoDataBasePageId(res){
    let toDoDataBasePageId;
    try{
        const results = res.data.results;
        if(!results){
            return null;
        }
        results.forEach(element => {
            if(element.type=="child_database"){
                if(element.child_database.title=="ToDo")
                    toDoDataBasePageId = element.id;
            }
        });
    }
    catch(error){
        logger.error(`GetToDoDataBasePageId error.${JSON.stringify(res)}`)
    }
    if(!toDoDataBasePageId){
        logger.error(`GetToDoDataBasePageId null.${JSON.stringify(res)}`)
    }
    return toDoDataBasePageId;
}

function GetTodayPageId(res){
    let todayPageId,todayPageTitle;
    try {
        const results = res.data.results;
        if(!results){
            return null;
        }
        const now = dayjs(dayjs().format("YYYYMMDD"));
        let selectStartDate,selectEndDate,startDiff,endDiff;
        results.forEach(element => {
            selectStartDate = dayjs(element.properties.Date.date.start)
            startDiff = now.diff(selectStartDate, 'day');
            if(element.properties.Date.date.end){
                selectEndDate = dayjs(element.properties.Date.date.end)
                
            }
            else{
                logger.info(`Cannot find the end date,use start date;start date:${selectStartDate},end date:${selectEndDate}`)
                selectEndDate = dayjs(element.properties.Date.date.start)
            }
            endDiff = now.diff(selectEndDate, 'day');
            
            if(startDiff>=0&&endDiff<=0){
                todayPageId = element.id;
                todayPageTitle = element.properties?.Name?.title[0].text.content
            }
        });
    }
    catch(error){
        logger.error(`GetTodayPageId error.${JSON.stringify(res)}`)
    }
    if(!todayPageId){
        logger.error(`GetTodayPageId null.${JSON.stringify(res)}`)
    }
    return {todayPageId,todayPageTitle};
}

export function BuildPageId(notionPageUrl){
    if(notionPageUrl){
        return notionPageUrl.split("?")[0].slice(-32)
    }
    return null
}