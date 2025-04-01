'use strict'

import l10n from '/extlib/l10n.js'
import * as constant from '/constants.js'

document.addEventListener('DOMContentLoaded', () => {
  const saveMessage = document.getElementById('save-message-success')

  // Load saved settings
  chrome.storage.sync.get(['new_tab_position'], result => {
    let new_tab_position = parseInt(result.new_tab_position, 10) || constant.NEW_TAB_POSITION_LAST_CHILD
    document.querySelector(`input[name="new_tab_position"][value="${new_tab_position}"]`).checked = true
  })

  // Save settings when the button is clicked
  document.getElementById('save-button').addEventListener('click', () => {
    const new_tab_position = document.querySelector('input[name="new_tab_position"]:checked').value
    chrome.storage.sync.set({ new_tab_position: parseInt(new_tab_position, 10) }, () => {
      // l10n.updateString('Settings saved!')

      // Show the save message
      saveMessage.style.display = 'inline'

      // Add fade-out class after a short delay
      // setTimeout(() => {
        saveMessage.classList.add('fade-out')
      // }, 500) // Delay before starting fade-out animation

      // Hide the message completely after the animation ends
      saveMessage.addEventListener('animationend', () => {
        saveMessage.style.display = 'none'
        saveMessage.classList.remove('fade-out')
      }, { once: true })
    })
  })
})
