<template>
  <div class="comments-content">
    <div class="comments-item" v-for="(item,index) in evaluaItems" :key="index">
      <p class="flexBox center">
        <img class="avatar" :src="item.avatar" alt="">
        <span class="flexChild flexBox column">
          <span class="nickname">{{item.nickname}}</span>
          <span class="nickname">{{item.createTime}}</span>
        </span>
        <rater v-model="item.grade" :fontSize="18" :disabled="true" active-color="#d73b3c"></rater>
      </p>
      <p>{{item.content || '系统默认好评！'}}</p>
      <div class="dsf fww">
        <img :src="i.image" class="commenImg" v-for="i,idx in item.imagesArray" @click="viewFullPhoto(idx, item.imagesArray)" >
      </div>
      <div v-if="item.sellerReply">
        卖家回复：{{item.sellerReply}}
      </div>
    </div>
    <PhotoViewer :data="currentImages" :index="currentPhotoIndex" v-model="showPhotos" v-if="showPhotos" />
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        showPhotos: false,    // 是否显示照片查看器
        currentPhotoIndex: 0, // 当前照片的索引
        currentImages: []     // 当前的图片数组
      }
    },
    props: {
      evaluaItems: Array
    },
    methods: {
      // 查看大图
      viewFullPhoto (index, images) {
        this.currentPhotoIndex = index
        this.currentImages = []
        images.map(item => {
          this.currentImages.push(item.image)
        })
        this.showPhotos = true
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~@/styles/index.scss";

  p {
    text-align: left;
    color: $importantInfoAndTitleColor;
    span {
      color: $paragraphColor;
    }
  }

  p:not(:first-child) {
    margin-top: pr(18);
  }

  .comments-content {
    line-height: pr(40);
    background: none;
    text-align: left;
    font-size: $normalFontSize;
    color: $supportTextColor;
    .comments-item {
      background: #fff!important;
      padding: pr(18) pr(24);
      .nickname {
        line-height:pr(30);
      }
      &:not(:first-child) {
        margin-top: pr(18);
        padding-top:pr(20);
      }
    }
  }

  .commenImg {
    width: pr(165);
    height: pr(165);
    border-radius: pr(10);
    border: 1px solid $lineColor;
    box-sizing: border-box;
    flex-shrink: 0;
    margin-right: pr(14);
    margin-top: pr(20);
  }

  .commenImg:nth-child(4) {
    margin-right: 0 !important;
  }

  .nickname {
    margin: 0 pr(20);
    text-align: left;
  }

  .avatar {
    width: pr(60);
    height: pr(60);
    border-radius: 50%;
  }
</style>
