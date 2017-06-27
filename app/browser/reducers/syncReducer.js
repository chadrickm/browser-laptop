/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict'

const appConstants = require('../../../js/constants/appConstants')
const syncUtil = require('../../../js/state/syncUtil')
const Immutable = require('immutable')

const syncReducer = (state, action) => {
  switch (action.actionType) {
    case appConstants.APP_SET_STATE:
      const pendingRecords = state.getIn(['sync', 'pendingRecords'])
      const orderedPendingRecords = Immutable.OrderedMap(pendingRecords)
      state = state.setIn(['sync', 'pendingRecords'], orderedPendingRecords)
      break
    case appConstants.APP_PEND_SYNC_RECORDS:
      action.records.forEach(record => {
        const key = syncUtil.pendingRecordKey(record)
        console.log(`APP_PEND_SYNC_RECORDS: ${key} => ${JSON.stringify(record)}`)
        state = state.setIn(['sync', 'pendingRecords', key])
      })
      break
    case appConstants.APP_CONFIRM_SYNC_RECORDS:
      action.records.forEach(record => {
        const key = syncUtil.pendingRecordKey(record)
        console.log(`APP_CONFIRM_SYNC_RECORDS: ${key} => ${JSON.stringify(record)}`)
        state = state.deleteIn(['sync', 'pendingRecords', key], record)
      })
      break
  }
  return state
}

module.exports = syncReducer
