import { Store, createStore, useStore as baseUseStore } from 'vuex';

export const key = Symbol();

export const store = createStore({
  state: {
    count: 0,
    // 第一步的源文件上传
    sourceSheet: [],
    // 第二步的文件
    configFiles: {},
    //系统修改配置
    recordConfig: {},
    //全局配置
    globalConfig: {}
  },
  mutations: {
    syncSourceSheet(state, sheet) {
      state.sourceSheet = sheet;
    },
    syncConfigFiles(state, sheet) {
      // console.log(sheet, "sheet")
      if (sheet.name) {
        state.configFiles[sheet.name] = sheet.files;
        console.log(state.configFiles, 'sheet');
      }
    },
    syncRecord(state, sheet) {
      if (sheet.name) {
        state.recordConfig[sheet.name] = { ...sheet.files };
        //console.log(state.recordConfig, 'record');
      }
    },
    syncGlobalConfig(state, sheet){
      state.globalConfig = sheet;
      //console.log(state.globalConfig, "state.global")
    }
  },
});
