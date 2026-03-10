const DisposableLabel = [
  'html',
  'body',
  'div',
  'b',
  'p',
  'u',
  'i',
  'strike',
  'span',
  'a',
  'sup',
  'hr',
  'font',
  'input',
  'textarea',
  'br',
  'table',
  'tbody',
  'td',
  'tr'
]

export const fontProcessing = (string, readonly) => {
  DisposableLabel.forEach((val) => {
    string = string
      .replace(new RegExp('＜' + val + '(.*?)＞', 'g'), '<' + val + '$1>')
      .replace(new RegExp('＜/' + val + '＞', 'g'), '</' + val + '>')
    if ((val === 'input' || val === 'textarea') && readonly) {
      const re = ' readonly'
      string = string.replace(new RegExp('<' + val + '(.*?)>', 'g'), '<' + val + re + '$1>')
    }
  })
  return string
}
