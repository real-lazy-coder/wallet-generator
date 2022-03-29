const fs = require('fs')
const ethers = require('ethers')

const wallets = 5000
const baseEmail = 'example'
const emailService = `@gmail.com`

const generateEmail = (integer) => {
  return `${baseEmail}+${integer}${emailService}`
}

const padNumber = (num, size = 4) => {
  var s = '000000000' + num
  return s.substring(s.length - size)
}

const generateCSV = (arr) => {
  fs.writeFileSync(
    './wallets.csv',
    arr.map((item) => item).join('\n'),
    'utf8',
    (err) => {
      console.log(err)
    }
  )
}

const main = async () => {
  let emailList = []
  for (let i = 0; i < wallets; i++) {
    const wallet = ethers.Wallet.createRandom()
    const email = generateEmail(padNumber(i + 1))

    const walletAddress = wallet.address
    const walletMnemonic = wallet.mnemonic.phrase
    const walletPrivateKey = wallet.privateKey

    emailList = [
      ...emailList,
      `${email},${walletAddress},${walletMnemonic},${walletPrivateKey},`,
    ]
  }
  generateCSV(emailList)
  console.log('done')
}

main()
