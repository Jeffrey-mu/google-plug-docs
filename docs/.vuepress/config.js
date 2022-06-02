const { defaultTheme } = require('@vuepress/theme-default')
module.exports = {
    lang: 'zh-CN',
    title: 'chrome扩展开发中文教程',
    description: '这是chrome扩展开发中文教程',
    theme: defaultTheme({
        navbar: [
            // NavbarItem
            {
                text: '代码范例',
                link: '/guide/',
            },
            // NavbarGroup
            {
                text: 'Manifest文件',
                link: '/manifest.html',
            },
            {
                text: 'git',
                link: 'https://github.com/Jeffrey-mu/google-plug-docs',
            },
        ],
        sidebar: {
            '/guide/': [
                {
                    text: '入门',
                    children: ['/guide/README.md', '/guide/getting-started.md'],
                },
            ],
        },
    }),
}