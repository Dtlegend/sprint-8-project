import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
 entry: {
    main:"./src/pages/index.js"
},
output:{
path: path.resolve(__dirname, "dist"),
filename: "main.js",
publicPath:""
},
mode: "development",
module: {
    rules: [
        {
            test: /\.js$/,
            loader: "babel-loader",
            exclude: /node_modules/,
            options: {
                presets: ["@babel/preset-env"]
            }
        },
        {
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
        },
        {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: "asset/resource"
        }
    ]
},
plugins: [
    new HtmlWebpackPlugin({
        template: "./src/index.html"
    })
 ]
};
