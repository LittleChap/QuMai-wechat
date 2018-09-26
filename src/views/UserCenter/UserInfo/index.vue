<template>
  <div v-if="userInfo" class="user-info-wrapper">
    <section>
      <p class="flexBox center">
        <span class="flexChild">我的头像</span>
        <span class="avatar-background">
        <label for="uploadImg">
          <img :src="getAvatar">
          <input id="uploadImg" @change="uploadAvatar" name="img" accept="image/*" type="file"/>
        </label>
        </span>
        <i class="icon-details-left"></i>
      </p>
      <p class="flexBox center">
        <span class="flexChild">我的昵称</span>
        <span @click="setUsername" class="flexChild">{{userInfo.nickname}}</span>
        <i class="icon-details-left"></i>
      </p>
      <p class="flexBox center">
        <span class="flexChild">性别</span>
        <span @click="showPopupPicker = true">{{showSex[0]}}</span>
        <popup-picker :show.sync="showPopupPicker" :show-cell="false" title="TEST" :data="sexArr"
            v-model="showSex"></popup-picker>
        <i class="icon-details-left"></i>
      </p>
      <p class="flexBox center">
        <span class="flexChild">我的生日</span>
          <span @click="showDatePicker = true" class="flexChild birthday-text">{{getBirthDay}}</span>
        <i class="icon-details-left"></i>
      </p>
      <p class="flexBox center">
        <span class="flexChild">我的等级</span>
        <router-link class="my-level flexChild" to="/userInfo/myLevel">
          <span class="level-text">{{userInfo.levelName}}</span>
        </router-link>
        <i class="icon-details-left"></i>
      </p>
      <p @click="$router.push('/userInfo/resetMobile/stepOne')" class="flexBox center">
        <span class="flexChild">绑定手机</span>
        <span class="flexChild">{{userInfo.mobile}}</span>
        <i class="icon-details-left"></i>
      </p>
    </section>
    <section>
      <p @click="$router.push('/addressList')" class="flexBox center">
        <span class="flexChild">收货地址</span>
        <span class="flexChild"></span>
        <i class="icon-details-left"></i>
      </p>
      <!--<p class="flexBox center">-->
      <!--<span class="flexChild">修改密码</span>-->
      <!--<span class="flexChild"></span>-->
      <!--<i class="icon-details-left"></i>-->
      <!--</p>-->
    </section>
    <datetime style="display: none;" @on-change="setBirthday" :min-year="1900" :end-date="endTime" :show-cell="false" :show.sync="showDatePicker">
    </datetime>
  </div>
</template>

<script type="text/ecmascript-6">
  import {PopupPicker, Datetime} from 'vux'
  import moment from 'moment'

  export default {
    components: {
      PopupPicker,
      Datetime
    },
    data () {
      return {
        showPopupPicker: false,
        sexArr: [['女', '男', '保密']],
        showDatePicker: false,
        endTime: moment(new Date()).format('YYYY-MM-DD')
      }
    },
    created () {
      if (!this.userInfo) {
        this.$store.dispatch('getUserInfo')
      }
    },
    computed: {
      userInfo () {
        return this.$store.state.UserCenter.userInfo
      },
      showSex: {
        set: function (val) {
          switch (val[0]) {
            case '男':
              this.$store.dispatch('setUserInfo', {sex: 1})
              break
            case '女':
              this.$store.dispatch('setUserInfo', {sex: 0})
              break
            case '保密':
              this.$store.dispatch('setUserInfo', {sex: 2})
              break
          }
        },
        get: function () {
          const sexArray = ['女', '男', '保密']
          const sex = this.getSex
          let returnVal = [sexArray[sex]]
          return returnVal
        }
      },
      getSex () {
        return [this.$store.state.UserCenter.userInfo.sex]
      },
      getBirthDay () {
        return this.$store.state.UserCenter.userInfo.birthday || '1970-01-01'
      },
      getAvatar () {
        return this.$store.state.UserCenter.userInfo.avatar || ''
      }
    },
    methods: {
      async uploadAvatar (e) {
        const _this = this
        const file = e.target.files[0]
        const url = '/mobileUpload/uploadImg.do'
        let form = new FormData()
        form.method = 'post'
        form.enctype = 'multipart/form-data'
        form.append('file', file, file.name)
        form.append('from', 'member')
        let res = await this.$upload(url, form)
        if (parseInt(res.code) === 1) {
          _this.$store.dispatch('setUserInfo', {avatar: res.data.url})
        }
      },
      setBirthday (val) {
        this.$store.dispatch('setUserInfo', {birthday: val})
      },
      setUsername () {
        const _this = this
        _this.$confirm({
          title: '请输入新的用户名：',
          showInput: true,
          confirmText: '更新',
          cancelText: '取消',
          onConfirm (value) {
            _this.$store.dispatch('setUserInfo', {nickname: value})
          },
          onShow () {
            _this.$vux.confirm.setInputValue(_this.$store.state.UserCenter.userInfo.nickname)
          }
        })
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~@/styles/index.scss";

  .user-info-wrapper {
    padding-top: pr(10);
    section {
      background: $footerBackgroundColor;
      @include wrapPadding();
      margin-bottom: pr(10);
      p {
        width: 100%;
        border-bottom: 1px solid $lineColor;
        padding: pr(32) 0;
        font-size: $importantFontSize;
        &:last-child {
          border: none;
        }
        .birthday-text, .level-text {
          color: $importantInfoAndTitleColor !important;
          padding-right: pr(20);
          text-align: right;
        }
        .my-level {
          text-align: right;
        }
        span:first-child {
          color: $paragraphColor;
        }
        span:nth-child(2) {
          color: $importantInfoAndTitleColor;
          padding-right: pr(20);
          text-align: right;
        }
        .avatar-background {
          position: relative;
          background: #e6e6e6;
          vertical-align: middle;
          width: pr(120);
          height: pr(120);
          border-radius: pr(60);
          margin-right: pr(20);
        }
        img {
          width: pr(120);
          height: pr(120);
          border-radius: pr(60);
          position: absolute;
          top: 0;
          left: 0;
        }
        input {
          display: none;
        }
        i {
          font-size: pr(28);
          color: $paragraphColor;
        }
      }
    }
  }
</style>
