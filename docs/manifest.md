# 格式：Manifest文件
每一个扩展、可安装的WebApp、皮肤，都有一个JSON格式的manifest文件，叫manifest.json，里面提供了重要的信息 。
## 字段说明

下面的JSON示例了manifest支持的字段，每个字段都有连接指向专有的说明。必须的字段只有：name和version。

```js
{
// 必须的字段
  "name": "My Extension",
  "version": "versionString",
  "manifest_version": 2,
  // 建议提供的字段
  "description": "A plain text description",
  "icons": { ... },
  "default_locale": "en",
  // 多选一，或者都不提供
  "browser_action": {...},
  "page_action": {...},
  "theme": {...},
  "app": {...},
  // 根据需要提供
  "background": {...},
  "chrome_url_overrides": {...},
  "content_scripts": [...],
  "content_security_policy": "policyString",
  "file_browser_handlers": [...],
  "homepage_url": "http://path/to/homepage",
  "incognito": "spanning" or "split",
  "intents": {...}
  "key": "publicKey",
  "minimum_chrome_version": "versionString",
  "nacl_modules": [...],
  "offline_enabled": true,
  "omnibox": { "keyword": "aString" },
  "options_page": "aFile.html",
  "permissions": [...],
  "plugins": [...],
  "requirements": {...},
  "update_url": "http://path/to/updateInfo.xml",
  "web_accessible_resources": [...]
}  
```
## 字段的含义

部分字段的详细的含义如下：
### app
可安装的webapp，包括打包过的app，需要这个字段来指定app需要使用的url。最重要的是app的启动页面------当用户在点击app的图标后，浏览器将导航到的地方。

### default_locale
指定这个扩展保的缺省字符串的子目录：_lcoales。如果扩展有_locales目录，这个字段是必须的。如果没有_locales目录，这个字段是必须不存在的。
### description
描述扩种的一段字符串（不能是html或者其他格式，不能超过132个字符）。这个描述必须对浏览器扩展的管理界面和Chrome Web Store都合适。你可以指定本地相关的字符。

### homepage_url
这个扩展的主页 url。扩展的管理界面里面将有一个链接指向这个url。如果你将扩展放在自己的网站上，这个url就很有用了。如果你通过了Extensions Gallery和Chrome Web Store来分发扩展，主页 缺省就是扩展的页面。

### icons
一个或者多个图标来表示扩展，app，和皮肤。你通常可以提供一个128x128的图标，这个图标将在webstore安装时候使用。扩展需要一个48x48的图标，扩展管理页面需要这个图标。同时，你还可以提供给一个16x16的图标作为扩页面的fa网页图标 。这个16x16的图标，还将显示在实验性的扩展infobar特性上。

图标要求是png格式，因为png格式是对透明支持最好的。你也可以用其他webkit支持的格式，如BMP,GIF,ICON和JPEG。下面有个例子：
```json
"icons": 
  { 
    "16": "icon16.png",             
    "48": "icon48.png",            
    "128": "icon128.png" 
  },  
```
>注意：请只使用文档说明的图标大小。可能你已经注意到了，chrome有时候会将这些图标尺寸变小，比如，安装对话框将128像素图标缩小为69像素了。然而，Chrome的界面细节可能每个版本都不一样，但每次变动都假设开发者使用的是文档标注过的尺寸。如果你使用了其他的尺寸，你的图标可能看起来很丑，在将来的某个版本中。
## ncognito
可选值："spanning"和"split"，指定当扩展在允许隐身模式下运行时如何响应。

扩展的缺省值是Spanning，这意味着扩展将在一个共享的进程里面运行。隐身标签页的事件和消息都会发送到这个共享进程，来源通过incognito标志来区分。

可安装的webapp的缺省值是split，这个意思是隐身模式下的webapp都将运行在他们自己的隐身进程中。如果app或扩展有背景页面，也将运行在隐身进程中。隐身进程和普通进程一样，只是cookie保存在内存中而已。每个进程只可看到和自己相关的事件和消息（比如，隐身进程只能看到隐身标签也更新）。这些进程之间不能互相通信。

根据经验，如果你的扩展或app需要在隐身浏览器里面开一个标签页，使用split；如果你的扩展或app需要登记录到远程服务器或者本地永久配置，用spanning。

## intents
一个字典，用于描述扩展或app所提供的全部intent handler。字典里的每个键指定了一个action verb。下面这个例子为"http://webintents.org/share"这个action verb指定了2个的intent handler。
```json
{
    "name": "test",
    "version": "1",
    "intents": {
      "http://webintents.org/share": [
        { 
          "type": ["text/uri-list"],
          "href": "/services/sharelink.html",
          "title" : "Sample Link Sharing Intent",
          "disposition" : "inline"
        },
        {
          "type": ["image/*"],
          "href": "/services/shareimage.html",
          "title" : "Sample Image Sharing Intent",
          "disposition" : "window"
        }
      ]
    }  
  }
```
“type”指定handler所支持的一组MIME。

“href”指定了处理intent的页面URL。对于托管的apps，这个URL必须在属于允许URL集。对于扩展，这个页面必须是扩展自带的，其URL是相对扩展根目录的相对路径。

当用户触发handler对应的动作时，“title”会显示在intent选择界面中。

“disposition”可以是“inline”或“window”。当intent被触发时，“window”表示将在一个新标签中打开，而“inline”表示直接在当前标签页打开。
### key
开发时为扩展指定的唯一标识值。

注意：通常您并不需要直接使用这个值，而是在您的代码中使用相对路径或者chrome.extension.getURL()得到的绝对路径。
这个值并不是开发时显式指定的，而是Chrome在安装.crx时辅助生成的。
### minimum_chrome_version
扩展，app或皮肤需要的chrome的最小版本，如果有这个需要的话。这个字符串的格式和 version字段一样。
### name
用来标识扩展的简短纯文本。这个文字将出现在安装对话框，扩展管理界面，和store里面。你可以指定一个本地相关的字符串为这个字段。
### nacl_modules
一个或多个从MIME到处理这个MIME的本地客户端模块之间的映射。 例如，下段代码中加粗部分将一个本地客户端模块注册为处理OpenOffice电子表格MIME。
```json
{
    "name": "Native Client OpenOffice Spreadsheet Viewer",
    "version": "0.1",
    "description": "Open OpenOffice spreadsheets, right in your browser.",
    "nacl_modules": [{
      "path": "OpenOfficeViewer.nmf",
      "mime_type": "application/vnd.oasis.opendocument.spreadsheet"
    }]
  }
```

"path" 指定一个NaCl 的manifest（就像扩展有各自的manifest一样，NaCl 也有自己的manifest文件，不同的是NaCl 的以.nmf作为后缀）。 这个路径是相对于扩展根目录的。 更多NaCl 信息和.nmf 文件格式请参考NaCl 技术概述。

一个MIME只能与一个“.nmf”文件关联，但一个“.nmf”文件可处理多个MIME。下面例子的扩展有2个“.nmf”文件，但处理了3个MIME。
```json
{
    "name": "Spreadsheet Viewer",
    "version": "0.1",
    "description": "Open OpenOffice and Excel spreadsheets, right in your browser.",
    "nacl_modules": [{
      "path": "OpenOfficeViewer.nmf",
      "mime_type": "application/vnd.oasis.opendocument.spreadsheet"
    },
    {
      "path": "OpenOfficeViewer.nmf",
      "mime_type": "application/vnd.oasis.opendocument.spreadsheet-template"
    },
    {
      "path": "ExcelViewer.nmf",
      "mime_type": "application/excel"
    }]
  }
```
>**注意**：扩展不在manifest中指定“nacl_modules”也可以使用NaCl。仅在扩展希望自己的NaCl 被浏览器知道并用于显示关联的MIME内容时才需要指定。

### offline_enabled
指定本扩展或app是否支持脱机运行。当Chrome检测到处于脱机状态，此项设置为“是”的app将会在新标签页中高亮显示。

### permissions
扩展或app将使用的一组权限。每个权限是一列已知字符串列表中的一个，如geolocatioin或者一个匹配模式，来指定可以访问的一个或者多个主机。权限可以帮助限定危险，如果你的扩展或者app被攻击。一些权限在安装之前，会告知用户，具体参考：权限提醒。

如果一个扩展api需要你的声明一个权限在manifest文件，一般的，api的文档将告诉怎么做。例如，Tabs页面告诉你这么声明一个tabs权限。

这是一个扩展的manifest文件的权限设置的一部分。

```json
"permissions": 
[    
	"tabs",    
	"bookmarks",    
	"http://www.blogger.com/",    
	"http://*.google.com/",    
	"unlimitedStorage"  
],  
```
下面的表格列举了一个扩展或者app可以使用的权限。

Permission          | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| *match pattern*     | Specifies a*host permission*. Required if the extension wants to interact with the code running on pages. Many extension capabilities, such as [cross-origin XMLHttpRequests](http://chrome.cenchy.com/xhr.html),[programmatically injected content scripts](http://chrome.cenchy.com/content_scripts.html#pi), and [the cookies API](http://chrome.cenchy.com/cookies.html) require host permissions. For details on the syntax, see [Match Patterns](http://chrome.cenchy.com/match_patterns.html).                                                                                                                                                                                                                                                                                                                 |
| "background"        | Makes Chrome start up early and and shut down late, so that apps and extensions can have a longer life.When any installed hosted app, packaged app, or extension has "background" permission, Chrome runs (invisibly) as soon as the user logs into their computer—before the user launches Chrome. The "background" permission also makes Chrome continue running (even after its last window is closed) until the user explicitly quits Chrome.**Note:**  Disabled apps and extensions are treated as if they aren't installed.You typically use the "background" permission with a [background page](http://chrome.cenchy.com/background_pages.html), [event page](http://chrome.cenchy.com/event_pages.html) or (for hosted apps) a [background window](http://code.google.com/chrome/apps/docs/background.html). |
| "bookmarks"         | Required if the extension uses the [chrome.bookmarks](http://chrome.cenchy.com/bookmarks.html) module.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| "chrome://favicon/" | Required if the extension uses the "chrome://favicon/*url*" mechanism to display the favicon of a page. For example, to display the favicon of http://www.google.com/, you declare the "chrome://favicon/" permission and use HTML code like this:
s| "contextMenus"      | Required if the extension uses the [chrome.contextMenus](http://chrome.cenchy.com/contextMenus.html) module.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| "cookies"           | Required if the extension uses the[ chrome.cookies](http://chrome.cenchy.com/cookies.html) module.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| "experimental"      | Required if the extension uses any [chrome.experimental.* APIs](http://code.google.com/chrome/extensions/experimental.html).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| "geolocation"       | Allows the extension to use the proposed HTML5 [geolocation API](http://dev.w3.org/geo/api/spec-source.html) without prompting the user for permission.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| "history"           | Required if the extension uses the [chrome.history](http://chrome.cenchy.com/history.html) module.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| "idle"              | Required if the extension uses the [chrome.idle](http://code.google.com/chrome/extensions/idle.html) module.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| "management"        | Required if the extension uses the [chrome.management](http://chrome.cenchy.com/management.html) module.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| "notifications"     | Allows the extension to use the proposed HTML5 [notification API](http://www.chromium.org/developers/design-documents/desktop-notifications/api-specification) without calling permission methods (such ascheckPermission()). For more information see [Desktop Notifications](http://chrome.cenchy.com/notifications.html).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| "tabs"              | Required if the extension uses the [chrome.tabs](http://chrome.cenchy.com/tabs.html) or [chrome.windows](http://chrome.cenchy.com/windows.html) module.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| "unlimitedStorage"  | Provides an unlimited quota for storing HTML5 client-side data, such as databases and local storage files. Without this permission, the extension is limited to 5 MB of local storage.**Note:** This permission applies only to Web SQL Database and application cache (see issue [58985](http://crbug.com/58985)). Also, it doesn't currently work with wildcard subdomains such ashttp://*.example.com.                                                                                                                                                                                                                                                                                                                                                                                                           |
### requirements
指定本app或扩展所需的特殊技术功能。安装扩展时，扩展商店根据这个清单，必要时劝阻用户在不支持所需功能的电脑上安装这些扩展。

目前只支持指定“3D”，也就是GPU加速。您可以指定所需的3D相关功能，比如：
```json
"requirements": {
    "3D": {
      "features": ["css3d", "webgl"]
    }
  }
```
### version
扩展的版本用一个到4个数字来表示，中间用点隔开。这些数字有些规则：必须在0到65535之间，非零数字不能0开头，比如，99999和032是不合法的。

下面是一些版本字符串例子：
```js
"version": "1"
"version": "1.0"
"version": "2.10.2"
"version": "3.1.2.4567"
```
自动升级系统将比较版本来确定一个已经安装的扩展是否需要升级。如果一个发布的扩展有一个更新的版本字符串，比一个安装的扩展，这个扩展将自动升级。

版本字符串从比较从左边开始。如果这些数字相等，这个数字的右边的数字将被比较，这样持续下去。比如：1.2.0就比1.1.9.9999更新。

缺少的数字将用0来代替。例子，1.1.9.9999就比1.1.更新。
### manifest_version
用整数表示manifest文件自身格式的版本号。从Chrome 18开始，开发者应该（不是必须，但是2012年底左右就必须了）指定版本号为2（没有引号），如下所示：
```js
"manifest_version": 2
```
manifest版本1从Chrome 18才开始逐步被弃用，版本2目前并不是必须的，但预计我们将在2012年底强制只支持版本2。还没有准备好支持manifest版本2的扩展、应用和主题，可以明确指定版本1，或者索性不提供本字段。

### web_accessible_resources
一组字符串，指定本扩展在注入的目标页面上所需使用的资源的路径（相对于扩展的安装根目录）。例如，扩展在example.com上注入脚本以构建制界面，将其间所需的资源（图片、图标、样式、脚本等）加入白名单，如下所示：
```json
{
    "web_accessible_resources": [
      "images/my-awesome-image1.png",
      "images/my-amazing-icon1.png",
      "style/double-rainbow.css",
      "script/double-rainbow.js"
    ],
  }
```
这些资源的访问URL是 chrome-extension://[PACKAGE ID]/[PATH]，可通过调用chrome.extension.getURL构造出。 这些白名单资源是通过CORS头提供的，因此可被类似XHR这样的机制使用。

扩展的content scripts自身不需要加入白名单

### 资源的缺省可用性
manifest_version为2的扩展，缺省将不能使用除web_accessible_resources中指定外的任何其它任何扩展包内资源。

manifest_version为1的扩展，缺省仍可访问任何扩展包内资源。但是，一旦指定web_accessible_resources，将也只能访问其中指定的资源。