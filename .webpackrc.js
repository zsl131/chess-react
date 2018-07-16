import { resolve } from 'path';

export default {
  // 接口代理示例
  proxy: {
    "/api": {
      "target": "http://test.example.com:89/api/",
      "changeOrigin": true,
      "pathRewrite": { "^/api" : "" }
    },
    "/wangeditor": {
      "target": "http://test.example.com:89/wangeditor/",
      "changeOrigin": true,
      "pathRewrite": { "^/wangeditor" : "" }
    },
    // "/api/v2": {
    //   "target": "http://192.168.0.110",
    //   "changeOrigin": true,
    //   "pathRewrite": { "^/api/v2" : "/api/v2" }
    // }
  },
  alias: {
    components: resolve(__dirname,"./src/components"),
    utils: resolve(__dirname,"./src/utils"),
    config: resolve(__dirname,"./src/utils/config"),
    enums: resolve(__dirname,"./src/utils/enums"),
    services: resolve(__dirname,"./src/services"),
    models: resolve(__dirname,"./src/models"),
    routes: resolve(__dirname,"./src/routes")
  },
  urlLoaderExcludes: [
    /\.svg$/,
  ],
  "extraBabelPlugins": [
    ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]
  ]
}
