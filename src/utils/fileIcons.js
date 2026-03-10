// 文件图标映射配置 - 使用 new URL 方式
export const fileIconsConfig = {
  // 图标映射配置
  icons: {
    // ========== 代码相关文件 ==========
    // 编程语言文件
    // java: 'code/java,c,cpp,go.png',
    // c: 'code/java,c,cpp,go.png',
    // cpp: 'code/java,c,cpp,go.png',
    // go: 'code/java,c,cpp,go.png',
    js: 'code/js.png',
    ts: 'code/ts.png',
    vue: 'code/vue.png',
    html: 'code/html.png',
    htm: 'code/html.png',
    py: 'code/py.png',
    sql: 'code/sql.png',

    // 配置文件
    json: 'code/json,config,conf.png',
    config: 'code/json,config,conf.png',
    conf: 'code/json,config,conf.png',
    xml: 'code/xml.png',

    // 日志和追踪文件
    log: 'code/log.png',
    trace: 'code/trace.png',

    // 字体文件
    otf: 'compress/otf,eot,woff,ttc,fon.png',
    eot: 'compress/otf,eot,woff,ttc,fon.png',
    woff: 'compress/otf,eot,woff,ttc,fon.png',
    ttc: 'compress/otf,eot,woff,ttc,fon.png',
    fon: 'compress/otf,eot,woff,ttc,fon.png',

    // ========== 压缩文件 ==========
    zip: 'compress/zip,rar,7z.png',
    rar: 'compress/zip,rar,7z.png',
    '7z': 'compress/zip,rar,7z.png',
    apk: 'compress/apk.png',
    exe: 'compress/exe,bin,cue,img.png',
    bin: 'compress/exe,bin,cue,img.png',
    cue: 'compress/exe,bin,cue,img.png',
    img: 'compress/exe,bin,cue,img.png',
    iso: 'compress/iso.png',

    // ========== 电子邮件文件 ==========
    outlook: 'email/outlook.png',
    eml: 'email/outlook.png',
    msg: 'email/outlook.png',
    pst: 'email/outlook.png',

    // ========== 图片文件 ==========
    // AI设计文件
    ai: 'image/ai.png',
    psd: 'image/ai.png',
    sketch: 'image/ai.png',
    fig: 'image/ai.png',

    // 常见图片格式
    jpg: 'image/png,bmp.png',
    jpeg: 'image/png,bmp.png',
    png: 'image/png,bmp.png',
    bmp: 'image/png,bmp.png',
    gif: 'image/png,bmp.png',
    webp: 'image/png,bmp.png',
    ico: 'image/png,bmp.png',
    svg: 'image/png,bmp.png',
    tiff: 'image/png,bmp.png',
    tif: 'image/png,bmp.png',

    // ========== 媒体文件 ==========
    // 音频文件
    mp3: 'media/mp3,wav,flac,ogg.png',
    wav: 'media/mp3,wav,flac,ogg.png',
    flac: 'media/mp3,wav,flac,ogg.png',
    ogg: 'media/mp3,wav,flac,ogg.png',
    aac: 'media/mp3,wav,flac,ogg.png',
    wma: 'media/mp3,wav,flac,ogg.png',
    m4a: 'media/mp3,wav,flac,ogg.png',

    // 视频文件
    mp4: 'media/mp4,mov,wmv,flv,mkv,webm,mpeg,h264,avi.png',
    mov: 'media/mp4,mov,wmv,flv,mkv,webm,mpeg,h264,avi.png',
    wmv: 'media/mp4,mov,wmv,flv,mkv,webm,mpeg,h264,avi.png',
    flv: 'media/mp4,mov,wmv,flv,mkv,webm,mpeg,h264,avi.png',
    mkv: 'media/mp4,mov,wmv,flv,mkv,webm,mpeg,h264,avi.png',
    webm: 'media/mp4,mov,wmv,flv,mkv,webm,mpeg,h264,avi.png',
    mpeg: 'media/mp4,mov,wmv,flv,mkv,webm,mpeg,h264,avi.png',
    h264: 'media/mp4,mov,wmv,flv,mkv,webm,mpeg,h264,avi.png',
    avi: 'media/mp4,mov,wmv,flv,mkv,webm,mpeg,h264,avi.png',
    m4v: 'media/mp4,mov,wmv,flv,mkv,webm,mpeg,h264,avi.png',
    mpg: 'media/mp4,mov,wmv,flv,mkv,webm,mpeg,h264,avi.png',
    m2v: 'media/mp4,mov,wmv,flv,mkv,webm,mpeg,h264,avi.png',
    mts: 'media/mp4,mov,wmv,flv,mkv,webm,mpeg,h264,avi.png',

    // ========== 文本文件 ==========
    txt: 'txt/txt.png',
    md: 'txt/md,rtf.png',
    rtf: 'txt/md,rtf.png',
    markdown: 'txt/md,rtf.png',

    // ========== 办公文档 ==========
    // Word文档
    doc: 'wps/doc,docx.png',
    docx: 'wps/doc,docx.png',
    dot: 'wps/doc,docx.png',
    dotx: 'wps/doc,docx.png',

    // Excel文档
    xls: 'wps/xls,xlsx,xlsb,xlsm,.png',
    xlsx: 'wps/xls,xlsx,xlsb,xlsm,.png',
    xlsb: 'wps/xls,xlsx,xlsb,xlsm,.png',
    xlsm: 'wps/xls,xlsx,xlsb,xlsm,.png',
    csv: 'wps/excel,csv,google sheets,ods.png',
    ods: 'wps/excel,csv,google sheets,ods.png',

    // PowerPoint文档
    ppt: 'wps/ppt.png',
    pptx: 'wps/ppt.png',
    pot: 'wps/ppt.png',
    potx: 'wps/ppt.png',
    pps: 'wps/ppt.png',
    ppsx: 'wps/ppt.png',

    // PDF文档
    pdf: 'wps/pdf.png',

    // 其他办公文档
    odt: 'wps/doc,docx.png',
    odp: 'wps/ppt.png',

    // ========== 默认图标 ==========
    default: 'unknown/source_unknown.png'
  },

  // 静态路径映射对象
  staticPaths: {
    // ========== 代码相关文件 ==========
    'code/java,c,cpp,go.png': new URL(
      'src/assets/img/fileIcon/code/java,c,cpp,go.png',
      import.meta.url
    ).href,
    'code/js.png': new URL('src/assets/img/fileIcon/code/js.png', import.meta.url).href,
    'code/ts.png': new URL('src/assets/img/fileIcon/code/ts.png', import.meta.url).href,
    'code/vue.png': new URL('src/assets/img/fileIcon/code/vue.png', import.meta.url).href,
    'code/html.png': new URL('src/assets/img/fileIcon/code/html.png', import.meta.url).href,
    'code/py.png': new URL('src/assets/img/fileIcon/code/py.png', import.meta.url).href,
    'code/sql.png': new URL('src/assets/img/fileIcon/code/sql.png', import.meta.url).href,

    // 配置文件
    'code/json,config,conf.png': new URL(
      'src/assets/img/fileIcon/code/json,config,conf.png',
      import.meta.url
    ).href,
    'code/xml.png': new URL('src/assets/img/fileIcon/code/xml.png', import.meta.url).href,

    // 日志和追踪文件
    'code/log.png': new URL('src/assets/img/fileIcon/code/log.png', import.meta.url).href,
    'code/trace.png': new URL('src/assets/img/fileIcon/code/trace.png', import.meta.url).href,

    // 文件夹备份
    'code/folderbak.png': new URL('src/assets/img/fileIcon/code/folderbak.png', import.meta.url)
      .href,

    // ========== 压缩文件 ==========
    'compress/otf,eot,woff,ttc,fon.png': new URL(
      'src/assets/img/fileIcon/compress/otf,eot,woff,ttc,fon.png',
      import.meta.url
    ).href,
    'compress/zip,rar,7z.png': new URL(
      'src/assets/img/fileIcon/compress/zip,rar,7z.png',
      import.meta.url
    ).href,
    'compress/apk.png': new URL('src/assets/img/fileIcon/compress/apk.png', import.meta.url).href,
    'compress/exe,bin,cue,img.png': new URL(
      'src/assets/img/fileIcon/compress/exe,bin,cue,img.png',
      import.meta.url
    ).href,
    'compress/iso.png': new URL('src/assets/img/fileIcon/compress/iso.png', import.meta.url).href,

    // ========== 电子邮件文件 ==========
    'email/outlook.png': new URL('src/assets/img/fileIcon/email/outlook.png', import.meta.url).href,

    // ========== 图片文件 ==========
    // AI设计文件
    'image/ai.png': new URL('src/assets/img/fileIcon/image/ai.png', import.meta.url).href,

    // 常见图片格式
    'image/png,bmp.png': new URL('src/assets/img/fileIcon/image/png,bmp.png', import.meta.url).href,

    // ========== 媒体文件 ==========
    // 音频文件
    'media/mp3,wav,flac,ogg.png': new URL(
      'src/assets/img/fileIcon/media/mp3,wav,flac,ogg.png',
      import.meta.url
    ).href,

    // 视频文件
    'media/mp4,mov,wmv,flv,mkv,webm,mpeg,h264,avi.png': new URL(
      'src/assets/img/fileIcon/media/mp4,mov,wmv,flv,mkv,webm,mpeg,h264,avi.png',
      import.meta.url
    ).href,

    // ========== 文本文件 ==========
    'txt/txt.png': new URL('src/assets/img/fileIcon/txt/txt.png', import.meta.url).href,
    'txt/md,rtf.png': new URL('src/assets/img/fileIcon/txt/md,rtf.png', import.meta.url).href,

    // ========== 办公文档 ==========
    // Word文档
    'wps/doc,docx.png': new URL('src/assets/img/fileIcon/wps/doc,docx.png', import.meta.url).href,

    // Excel文档
    'wps/xls,xlsx,xlsb,xlsm,.png': new URL(
      'src/assets/img/fileIcon/wps/xls,xlsx,xlsb,xlsm,.png',
      import.meta.url
    ).href,
    'wps/excel,csv,google sheets,ods.png': new URL(
      'src/assets/img/fileIcon/wps/excel,csv,google sheets,ods.png',
      import.meta.url
    ).href,

    // PowerPoint文档
    'wps/ppt.png': new URL('src/assets/img/fileIcon/wps/ppt.png', import.meta.url).href,

    // PDF文档
    'wps/pdf.png': new URL('src/assets/img/fileIcon/wps/pdf.png', import.meta.url).href,

    // ========== 默认图标 ==========
    'unknown/source_unknown.png': new URL(
      'src/assets/img/fileIcon/unknown/source_unknown.png',
      import.meta.url
    ).href
  },

  getIconUrl(extension) {
    const ext = extension.toLowerCase()
    const iconFile = this.icons[ext] || this.icons.default
    return this.staticPaths[iconFile] || this.staticPaths['unknown/source_unknown.png']
  },

  generateIconMap() {
    const iconMap = {}
    Object.keys(this.icons).forEach((ext) => {
      iconMap[ext] = this.getIconUrl(ext)
    })
    return iconMap
  }
}
