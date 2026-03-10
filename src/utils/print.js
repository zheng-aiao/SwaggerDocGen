const PRINTCSS = `
<style>
       table {
        font-size: 16px;
        border-collapse: collapse;
        font-weight: normal;
      }
      table tr td, table tr th {
        padding: 10px;
        border: 1px solid #222;
        word-break: break-all;
        word-wrap: break-word
      }
      .table-col-2 {
        width: 16.67%;
      }
      .table-col-3{
      width: 25%;
      }
      table .aside {
        text-align: center;
      }
<style>
`
export const PRINTCSS_RISK = `
<style lang="scss" scoped>
.form-title {
  display: block;
  text-align: center;
  font-size: 30px;
  margin-bottom: 10px
}
.detail-table table{
  width: 100%;
  font-size: 12px;
  border-collapse: collapse;
  font-weight: normal;
}
.detail-table tr>td,.detail-table table th{
  max-width: 150px;
  padding: 10px;
  border: 1px solid #2b4fb5;
  word-break: break-all;
  word-wrap: break-word
}
.detail-table table th{
  text-align: center;
}
.detail-table table td{
  text-align: left;
}
.detail-table table .text-center {
  text-align: center;
}
</style>`

export const TICKER = `
<style lang="scss" scoped>
.title {
  width: 100%;
  text-align: center;
  font-size: 20px;
  color: #fff;
  background-color: #f8f7fc;
  color: black;
  margin: 20px 0;
}
table {
  width: 100%;
  border-collapse: collapse;
}
td {
  margin: 0;
  height: 40px;
  text-align: center;
  padding: 5px 10px;
  border: 1px solid #a8a8a8;
  text-align: left;
  background-color: #f8f7fc;
  color: black;
}
.flex {
  display: flex;
  flex-wrap: wrap;
}
.txt {
  font-size: 16px;
  letter-spacing: 3px;
  padding: 0 5px;
  text-indent: 2em;
}
.typeTxt {
  padding: 0 10px;
}
.sign_title {
  width: 20%;
  height: 125px;
  border-right: 1px solid #a8a8a8;
  text-align: center;
}
.sign_cont_box {
  width: 80%;
  padding: 0;
}
.sign_cont {
  width: 100%;
}
.sign_tips {
  width: 100%;
  height: 75px;
  border-bottom: 1px solid #a8a8a8;
  padding: 5px;
  text-indent: 2em;
  display: flex;
  align-items: center;
}
.sign_sign {
  height: 50px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #a8a8a8;
}
.sign_sign_box:nth-child(n) {
  border-right: 1px solid #a8a8a8;
  text-align: center;
  line-height: 45px;
}
.sign_sign_box:nth-child(2n - 1) {
  width: 15%;
}
.sign_sign_box:nth-child(2n) {
  width: 35%;
}
.signImg {
  width: 98%;
  height: 97%;
}
.sign_opinion {
  height: 50px;
  display: flex;
  justify-content: space-between;
}
.sign_opinion_box:nth-child(n) {
  border-right: 1px solid #a8a8a8;
  text-align: center;
  line-height: 45px;
}
.sign_opinion_box:first-child {
  width: 30%;
}
.sign_opinion_box:last-child {
  width: 70%;
  text-align: left;
  padding: 0 10px;
}
</style>`

export const PRINT_CSS_RISK = `
<style>
  @page {
    size: A4;
    margin: 15mm;
  }
  
  body {
    font-family: "Microsoft YaHei", Arial, sans-serif;
    font-size: 12px;
    line-height: 1.5;
    color: #333;
  }
  
  .print-container {
    width: 100%;
  }
  
  table {
    width: 100% !important;
    table-layout: fixed !important;
    border-collapse: collapse !important;
  }
  
  th, td {
    border: 1px solid #333 !important;
    padding: 8px 4px !important;
    vertical-align: middle !important;
  }
  
  th {
    font-weight: bold !important;
    background-color: #f8f9fa !important;
  }
</style>`

export function printByDom(dom, _css, mode) {
  let iframe = document.getElementById('J_print_iframe'),
    doc = null
  if (iframe) {
    doc.write('<div>' + dom.innerHTML + '</div>')
    doc.close()
  } else {
    iframe = document.createElement('iframe')
    iframe.setAttribute('id', 'print-iframe')
    iframe.setAttribute('style', 'position:absolute;left:-500px;top:-500px;')
    document.body.appendChild(iframe)

    doc = iframe.contentWindow.document
    doc.write('<div>' + dom.innerHTML + '</div>')
    doc.close()
    iframe.contentWindow.document.head.innerHTML = _css || PRINTCSS

    iframe.contentWindow.focus()
  }

  if (mode) {
    iframe.onload = function () {
      iframe.contentWindow.print()
    }
  } else {
    iframe.contentWindow.print()
  }
}
