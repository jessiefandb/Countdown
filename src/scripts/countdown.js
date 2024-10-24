class FastgrowthCountdown extends HTMLElement {
  constructor () {
    super()
    this.nowTime = 0

    this.$timeWrap = this.querySelector('.as-countdown-time-wrap')
    this.$days = this.querySelector('.as-countdown-days')
    this.$hours = this.querySelector('.as-countdown-hours')
    this.$minutes = this.querySelector('.as-countdown-minutes')
    this.$seconds = this.querySelector('.as-countdown-seconds')
    this.$text = this.querySelector('.as-countdown-text')
    this.$daysLabels = this.querySelectorAll('.as-countdown-days-labels')

    this.$text !== null && (this.text = this.$text.dataset?.text)

    this.eventTime = this.dataset?.eventTime === undefined ? 0 : Number(this.dataset?.eventTime)
  }

  connectedCallback () {
    this.init()
    this.getCurrentTime()
    this.handleVisibilityChange()
  }

  init () {
    if (this.$timeWrap === null || this.eventTime <= 0) {
      this.classList.remove('inactive')
    }
  }

  fetchConfig (type = 'json') {
    return {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: `application/${type}` }
    }
  }

  handleVisibilityChange () {
    document.addEventListener('visibilitychange', () => {
      this.classList.add('inactive')
      if (document.visibilityState === 'visible') {
        clearTimeout(this.intervalId)
        this.init()
        this.getCurrentTime()
      }
    })
  }

  /**
   * @description 调用接口获取当前时间戳, 单位: s
  */
  getCurrentTime () {
    fetch('https://now.fastgrowth.app/', { ...this.fetchConfig() })
      .then(response => {
        return response.json()
      })
      .then(data => {
        if (data?.code === '200') {
          this.nowTime = data.data?.now_time
          this.handleCountdown(this.nowTime)
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  /**
   * @description 获取当前时间后, 基于开始时间和结束时间处理逻辑
   * @nowTime 当前时间 / 倒计时过程中的当前时间
  */
  handleCountdown(nowTime) {
    // 默认活动已结束 倒计时全部展示为 0
    let diffTime = 0
    this.intervalId = setInterval(() => {
      this.classList.remove('inactive')

      if (this.eventTime > 0) {
        this.$text !== null && (this.$text.innerHTML = String(this.text))
        if (nowTime <= this.eventTime) {
          diffTime = this.eventTime - nowTime
        } else if (nowTime > this.eventTime) {
          diffTime = this.eventTime - nowTime
        }
      }

      if (diffTime >= 0) {
        this.handleOverTime(diffTime)
      } else {
        // 活动结束
        clearInterval(this.intervalId)
        if (this.dataset?.hide === 'true') {
          this.classList.add('inactive')
        }
      }
      ++nowTime
    }, 1000)
  }

  /**
   * @description 将时间差处理成时分秒
   * @param diffTime 时间差
  */
  handleOverTime(diffTime) {
    const d = Math.floor(diffTime / 60 / 60 / 24)
    const h = Math.floor(diffTime / 60 / 60 % 24)
    const m = Math.floor(diffTime / 60 % 60)
    const s = Math.floor(diffTime % 60)

    this.changeDaysStyle(d)

    this.$days !== null && (this.$days.innerHTML = this.handleSingleDigit(`${d}`))
    this.$hours !== null && (this.$hours.innerHTML = this.handleSingleDigit(`${h}`))
    this.$minutes !== null && (this.$minutes.innerHTML = this.handleSingleDigit(`${m}`))
    this.$seconds !== null && (this.$seconds.innerHTML = this.handleSingleDigit(`${s}`))
  }

  /**
   * @description 当 number 大于2位数时, 修改 days block 的样式
  */
  changeDaysStyle (number) {
    if (number > 99) {
      this.$days?.classList.add('w-auto')
    } else {
      this.$days?.classList.remove('w-auto')
      if (number <= 0) {
        this.$daysLabels.forEach((item) => {
          item.classList.add('d-none')
        })
      }
    }
  }

  /**
   * @description 在小于10的数前面拼接字符串 0
   * @param number
  */
  handleSingleDigit (number) {
    return Number(number) > 9 ? number : `0${number}`
  }
}

if (customElements.get('fastgrowth-countdown') === undefined) {
  customElements.define('fastgrowth-countdown', FastgrowthCountdown)
}
