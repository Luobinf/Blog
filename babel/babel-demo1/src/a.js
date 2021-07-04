const a = () => {
  console.log(this)
}

const b = new Map()

Promise.resolve(2).then(val => {
  console.log(val)
})