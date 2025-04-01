import * as constant from '/constants.js'

const sleep = msec => new Promise(resolve => setTimeout(resolve, msec))

async function submitToTST() {
  var retryCount = 0
  while (retryCount < 5) {
    console.log("trying to submit addon information to TST...", retryCount)
    await sleep(1000 * retryCount)
    try {
      await browser.runtime.sendMessage(constant.TST_ID, {
        type: "register-self",
        name: browser.runtime.getManifest().id,
        icons: browser.runtime.getManifest().icons,
        listeningTypes: ["tab-dblclicked"]
      })
      console.log(["successful submit to TST"])
      break
    } catch(e) {
      console.error(["Failed to connect with TST", e])
    }
    retryCount++
  }
}

async function main() {
  browser.runtime.onMessageExternal.addListener(async (message, sender) => {
    if (sender.id !== constant.TST_ID) return
    console.log(message)

    switch (message.type) {
      case "tab-dblclicked":
        if (message.button !== constant.BTN_LEFT) return

        if (message.tab.children.length === 0) {
          console.log(`${message.tab.id} has no children, create first child tab`)
          let tab = await browser.runtime.sendMessage(constant.TST_ID, { type: 'create', params: {
            active: true,
            windowId: message.tab.windowId,
            openerTabId: message.tab.id
          }})
          let _ = await browser.runtime.sendMessage(constant.TST_ID, {
            type: 'focus',
            tab: tab.id
          })
          return
        }

        chrome.storage.sync.get(['new_tab_position'], async (result) => {
          let new_tab_position = constant.NEW_TAB_POSITION_LAST_CHILD
          if (result.new_tab_position !== undefined) {
            new_tab_position = parseInt(result.new_tab_position, 10)
          }
          console.log("new_tab_position: ", new_tab_position)

          if (new_tab_position === constant.NEW_TAB_POSITION_NONE) {
            console.log("new_tab_position is none, do nothing")
            return
          }

          if (message.ctrlKey) {
            console.log("ctrl key is pressed, invert action")
            new_tab_position = new_tab_position === constant.NEW_TAB_POSITION_FIRST_CHILD ? constant.NEW_TAB_POSITION_LAST_CHILD : constant.NEW_TAB_POSITION_FIRST_CHILD
          }

          console.log(message.tab)
          if (new_tab_position === constant.NEW_TAB_POSITION_FIRST_CHILD) {
            console.log("new_tab_position is first child, create first child tab")
            let tab = await browser.runtime.sendMessage(constant.TST_ID, { type: 'create', params: {
              active: true,
              windowId: message.tab.windowId,
              openerTabId: message.tab.id,
              index: message.tab.children[0].index
            }})
            let _ = await browser.runtime.sendMessage(constant.TST_ID, {
              type: 'focus',
              tab: tab.id
            })
          } else {
            console.log("new_tab_position is last child, create last child tab")
            let tab = await browser.runtime.sendMessage(constant.TST_ID, { type: 'create', params: {
              active: true,
              windowId: message.tab.windowId,
              openerTabId: message.tab.id,
              index: message.tab.children.at(-1).index + 1
            }})
            let _ = await browser.runtime.sendMessage(constant.TST_ID, {
              type: 'focus',
              tab: tab.id
            })
          }
        })
        return
      case "ready":
      case 'permissions-changed':
        await submitToTST()
        break
    }
  })

  await submitToTST()
}

main()
