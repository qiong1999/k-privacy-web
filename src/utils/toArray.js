export const toArray = (csv) => {
  csv = csv.replace(/^[\s\r\n]+|[\s\r\n]+$/g,"")
  return csv.split('\n').map(item => item.split(';'))
}