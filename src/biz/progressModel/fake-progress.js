class FakeProgress {
  /**
   * @param {number} options.incrementRate - 每次更新进度的时间间隔（单位：毫秒）
   * @param {number} options.timeConstant - 时间常量，分母越大，进度条越慢
   * @param {function} options.callback - 进度更新时的回调函数
   */
  constructor(options = {}) {
    this.progress = 0
    this.incrementRate = options.incrementRate || 100
    this.timeConstant = options.timeConstant || 7000 // 时间常量，分母越大，进度条越慢
    this.callback = options.callback // 进度更新时的回调函数
  }

  // 开始进度条
  start() {
    this.progress = 0
    this._currentTime = 0
    this._timer = setInterval(this._onInterval.bind(this), this.incrementRate)
  }

  // 定时器回调函数，用于更新进度
  _onInterval() {
    this._currentTime += this.incrementRate

    if (!this.useHalfIncrementRate && this.progress >= 0.5) {
      this.useHalfIncrementRate = true
      clearInterval(this._timer)
      this._timer = setInterval(this._onInterval.bind(this), 200) // 改为每 200 毫秒更新一次
    }

    this.setProgress(1 - Math.exp((-1 * this._currentTime) / this.timeConstant))
  }

  // 结束进度条，并将进度设置为 1
  end() {
    this.stop()
    this.setProgress(1)
  }

  // 停止进度条
  stop() {
    clearInterval(this._timer)
    this._timer = null
  }

  /**
   * 设置进度
   * @param {number} progress - 进度值（取值范围为 0 到 1）
   */
  setProgress(progress) {
    this.progress = progress
    if (this.callback && typeof this.callback === 'function') {
      this.callback(progress)
    }
  }
}

export default FakeProgress
