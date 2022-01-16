/**
 * Functions that are commonly called through-out
 * @functions -
 * @author Jishna AV
 */

/* eslint-disable @typescript-eslint/camelcase */

import { DatePipe } from '@angular/common'
import { Injectable } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { of, timer } from 'rxjs'
import { interval, Subscription } from 'rxjs'
import { ApiService } from '../services/api.service'
import { BlockchainService } from '../services/blockchain.service'
import { ObservablesService } from '../services/observables/observables.service'
import { VideoService } from '../services/video.service'
import { AlertBox } from './alert-box'

@Injectable({
  providedIn: 'root',
})
export class CommonFunctionCall {
  public kCredits: any
  public kCoins: any
  private subscription
  public txnHash: any

  constructor(
    private datePipe: DatePipe,
    public dialog: MatDialog,
    private api: ApiService,
    private blockchain: BlockchainService,
    private video: VideoService,
    private alert: AlertBox,
    private observables: ObservablesService,
  ) {
    this.observables.credits.subscribe((kcredits) => {
      this.kCredits = kcredits
    })
    this.observables.coins.subscribe((kcoins) => {
      this.kCoins = kcoins
    })
  }

  public transformDate(date) {
    return this.datePipe.transform(date, 'date')
  }

  public getUserDetails() {
    const url = 'users/' + this.api.userId
    this.api.doGetRequest(url).subscribe(
      (returnData: any) => {
        return returnData
      },
      (error) => {
        // console.log(error);
        this.alert.error('Oops!', 'Something went wrong, Please try again later')
      },
    )
  }

  public getCategoryVideoList(category: any) {
    this.video.doVideoGetRequest(category).subscribe(
      (returnData: any) => {
        // console.log(returnData);
        return returnData
      },
      (error) => {
        // console.log(error);
        this.alert.error('Oops!', 'Something went wrong, Please try again later')
      },
    )
  }

  public kCreditsRedemptionOnVideoPlay() {
    const data = {
      user_id: this.api.userId,
      kcredit_amount: '2.50',
    }
    const url = 'kcredit/updateKCreditsDetailsOnKcreditsRedemption'
    this.blockchain.doBlockchainPostRequest(data, url).subscribe(
      (returnData) => {
        if (returnData['status']) {
          this.alert.success('Congratulations!', 'Credits added to your Coinania wallet account')
        }
      },
      (error) => {
        this.alert.error('Oops!', 'Something went wrong, Please try again later')
      },
    )
  }

  public loadWalletDetails() {
    this.creditBalance()
    this.coinBalance()
    this.transactionHistory()
  }

  public creditBalance() {
    const url = 'kcredit/getKcreditsDetailsByAccount'
    const data = {
      user_id: this.api.userId,
    }
    this.blockchain.doBlockchainPostRequest(data, url).subscribe(
      (returnData: any) => {
        // console.log('Credit balance - ', returnData);
        if (returnData.status) {
          this.observables.changekCredits(returnData.response[0].kcredit_balance)
        }
      },
      (error) => {
        console.log(error)
        this.alert.error('Oops!', 'Something went wrong, Please try again later')
      },
    )
  }

  public coinBalance() {
    if (this.api.hasWallet) {
      const url = 'blockchain/getTokenBalance'
      const data = {
        eth_address: this.api.walletAddress,
      }
      this.blockchain.doBlockchainPostRequest(data, url).subscribe(
        (returnData: any) => {
          // console.log('Coin balance - ', returnData);
          if (returnData.status) {
            this.observables.changekCoins(returnData.TokenBalance)
          }
        },
        (error) => {
          console.log(error)
          this.alert.error('Oops!', 'Something went wrong, Please try again later')
        },
      )
    }
  }

  public transactionHistory() {
   
    if (this.api.hasWallet) {
      const url = 'kcredit/getKCoinsTxnHistoryByAccount'
      const data = {
        user_id: this.api.userId,
      }
      this.blockchain.doBlockchainPostRequest(data, url).subscribe(
        (returnData: any) => {
          console.log('Txn history', returnData.response)
          if (returnData.status) {
            this.observables.changeTransactionHistory(returnData.response.reverse())
          }
        },
        (error) => {
          console.log(error)
          this.alert.error('Oops!', 'Something went wrong, Please try again later')
        },
      )
    }
  }
  public goFundItHistory() {
    if (this.api.hasWallet) {
      const url = 'blockchain/getKdonation'
      const data = {
        receiver_id: this.api.userId,
      }
      this.blockchain.doBlockchainPostRequest(data, url).subscribe(
        (returnData: any) => {
          // console.log('Txn history', returnData.response)
          if (returnData.status) {
            this.observables.changeGofundItHistory(returnData.response.reverse())
          }
        },
        (error) => {
          console.log(error)
          this.alert.error('Oops!', 'Something went wrong, Please try again later')
        },
      )
    }
  }

  public creditCoinTransaction() {
    // const url = 'kcredit/getKcreditsThreshold'
    // this.blockchain.doBlockchainGetRequest(url).subscribe(
    const customerId = sessionStorage.getItem('customerId')

    this.api.getOrgAttributesUser().subscribe(
      (returnData: any) => {
        if (returnData) {
          // // console.log('Threshold value - ', returnData);
          // const threshold = returnData.threshold_value

          const kcredits = returnData[0].additional as string
          const kcreditsvalue = kcredits.length ? JSON.parse(kcredits) : {}
          const threshold = kcreditsvalue.threshold_value

          if (parseFloat(this.kCredits) >= parseFloat(threshold)) {
            this.alert.success('Congratulations!', 'Your wallet have enough credit balance')
            const date: Date = new Date()
            const url = 'blockchain/transaction'
            const data = {
              tx_type: 'Redemption',
              user_id: this.api.userId,
              to_address: this.api.walletAddress,
              transfer_amount: this.kCredits,
              date_time: date,
            }
            this.blockchain.doBlockchainPostRequest(data, url).subscribe(
              (returnData: any) => {
                // console.log('Transaction status - ', returnData);

                if (returnData) {
                  this.alert.info('Great!', 'Your transaction is initiated')
                  this.dialog.closeAll()
                  this.loadWalletDetails()
                  this.transactionInfo(returnData.data.transactionHash)
                }
              },
              (error) => {
                console.log(error)
                this.alert.error('Oops!', 'Something went wrong, Please try again later')
              },
            )
          } else {
            this.alert.warning('Warning!', 'Sorry your wallet does not have the required credit balance')
            this.dialog.closeAll()
          }
        }
      },
      (error) => {
        console.log(error)
        this.alert.error('Oops!', 'Something went wrong, Please try again later')
      },
    )
  }

  public transactionInfo(txnHash) {
    const data = {
      txHash: txnHash,
    }
    this.subscription = this.blockchain.checkTransactionInfoStatus(data).subscribe(
      (returnStatus: any) => {
        // console.log('Transaction Info Status - ', returnStatus);
        if (returnStatus.txStatus === 'confirmed') {
          this.subscription.unsubscribe()

          const url = 'kcredit/confirmKCoinsConversionHistory'
          const data = {
            tx_hash: txnHash,
          }
          this.blockchain.doBlockchainPostRequest(data, url).subscribe(
            (returnData: any) => {
              // console.log('confirm KCoins Conversion History - ', returnData);
              if (returnData) {
                this.alert.success('Success!', 'Your transaction is Successful')
                this.loadWalletDetails()
              }
            },
            (error) => {
              console.log(error)
              this.alert.error('Oops!', 'Something went wrong, Please try again later')
            },
          )
        }
      },
      (error) => {
        console.log(error)
        this.alert.error('Oops!', 'Something went wrong, Please try again later')
      },
    )
  }

  public pendingTransactionInfo() {
    let pendingTxnList = []
    if (this.api.hasWallet) {
      const url = 'kcredit/getKCoinsPendingTxnHistoryByAccount'
      const data = {
        user_id: this.api.userId,
      }
      this.blockchain.doBlockchainPostRequest(data, url).subscribe(
        (returnData: any) => {
          // console.log('Pending Txn history', returnData.response);
          pendingTxnList = returnData.response
          if (pendingTxnList.length !== 0) {
            pendingTxnList.forEach((pendingTxn) => {
              // console.log('pending txn hash', pendingTxn.tx_hash);

              const data = {
                txHash: pendingTxn.tx_hash,
              }
              this.subscription = this.blockchain.checkTransactionInfoStatus(data).subscribe(
                (returnStatus: any) => {
                  // console.log('Transaction Info Status - ', returnStatus);
                  if (returnStatus.txStatus === 'confirmed') {
                    this.subscription.unsubscribe()

                    const url = 'kcredit/confirmKCoinsConversionHistory'
                    const data = {
                      tx_hash: pendingTxn.tx_hash,
                    }
                    this.blockchain.doBlockchainPostRequest(data, url).subscribe(
                      (returnData: any) => {
                        // console.log('confirm KCoins Conversion History - ', returnData);
                        if (returnData) {
                          this.alert.success('Success!', 'Your transaction is Successful')
                          this.loadWalletDetails()
                        }
                      },
                      (error) => {
                        console.log(error)
                        this.alert.error('Oops!', 'Something went wrong, Please try again later')
                      },
                    )
                  }
                },
                (error) => {
                  console.log(error)
                  this.alert.error('Oops!', 'Something went wrong, Please try again later')
                },
              )
            })
          }
        },
        (error) => {
          console.log(error)
          this.alert.error('Oops!', 'Something went wrong, Please try again later')
        },
      )
    }
  }
}
