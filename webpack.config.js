const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const generateHtmlPlugin = (title) => {
    return new HtmlWebpackPlugin({
        title : `${title}`,
        filename: `pages/${title}.html`,
        chunks: ['index'],
        template: `./src/pages/${title}.html`
    })
}

const populateHtmlPlugins = (pagesArray) => {
    res = [];
    pagesArray.forEach(page => {
        res.push(generateHtmlPlugin(page));
    });
    return res
}

const pages = populateHtmlPlugins([]);

module.exports = {
	mode: "development",
	entry: {
        index: './src/index.js' 
    },
	output: {
		filename: "main.[contenthash].js",
		path: path.resolve(__dirname, "dist"),
		publicPath: "/",
	},
	devServer: {
		contentBase: "./dist",
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: "./src/index.html",
        }),
	].concat(pages),
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'css/[name].[hash].css',
						}
					},
					{
						loader: 'extract-loader'
					},
					{
						loader: 'css-loader?-url'
					},
					{
						loader: 'postcss-loader'
					},
					{
						loader: 'sass-loader'
					}
				]
			},
			{
				test: /\.html$/,
				use: {
                    loader: 'html-loader',
                    options: {
						minimize: true,
						attributes:{
							list: [
								'...',
								{
									tag: 'main-navbar',
									attribute: 'brand',
									type: 'src'
								},
								{
									tag: 'main-navbar',
									attribute: 'brandhref',
									type: 'src'
								}
							]
						}
                    }
                },
			},
			{
				test: /\.(svg|png|jpg|gif|jpeg)$/,
				use: {
					loader: "file-loader",
					options: {
						name: "[name].[hash].[ext]",
						outputPath: "img",
						publicPath: "img",
					},
				},
			},
		],
	},
};
