// 提示信息插件
import pack from '@/../package.json'
import { getPluginIcon } from '@/helper/getter'
import { SUAPlugin } from '@/core/types'
import { isDev, isLoginPage } from '@/helper/judger'

const { version } = pack

export default {
  name: 'tooltip',
  displayName: '提示信息',
  icon: getPluginIcon('tooltip'),
  isNecessary: true,
  defaultEnabledState: true,
  brief: '在登录页面以及教务系统的顶部导航栏显示提示，告知用户当前的程序版本。',
  pathname: true,
  init() {
    const versionName = `${version} (${isDev() ? 'dev' : 'stable'})`
    if (isLoginPage()) {
      const $loginTooltip = $(
        require('./loginTooltip.pug')({ version: versionName })
      )
      $('#formContent').prepend($loginTooltip)
    } else {
      const $navTooltip = $(
        require('./navTooltip.pug')({ version: versionName })
      )
      $('#navbar-container > div.navbar-buttons.navbar-header.pull-right > ul')
        .children('li')
        .eq(1)
        .before($navTooltip)
    }
  }
} as SUAPlugin
