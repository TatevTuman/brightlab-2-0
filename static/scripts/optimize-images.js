const sharp = require(`sharp`)
const glob = require(`glob`)
const fs = require(`fs-extra`)

const matches = glob.sync(`static/assets/images/*.{png,jpg,jpeg}`)
const MAX_WIDTH = 1200
const QUALITY = 70

Promise.all(
  matches.map(async match => {
    console.log('image', match)

    const backupDir = 'static/assets/images/backup'
    const stream = sharp(match)
    const info = await stream.metadata()

    if (info.width < MAX_WIDTH) {
      return
    }

    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir)
    }

    const nameParts = match.split('/')
    const originalName = nameParts[nameParts.length - 1]

    const optimizedName = match.replace(/(\..+)$/, (match, ext) => `-optimized${ext}`)

    fs.copyFile(match, `${backupDir}/${originalName}`, err => {
      if (err) throw err
    })

    await stream.resize(MAX_WIDTH).jpeg({ quality: QUALITY }).toFile(optimizedName)

    return fs.rename(optimizedName, match)
  })
).then(res => {
  console.log('Images are optimized')
})
