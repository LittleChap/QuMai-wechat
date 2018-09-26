<template>
  <section>
    <div v-if="goodsDetailComments > 0" @click="$router.push('/goodsDetail/' + $route.params.id + '/evaluateDetail')">
      小伙伴都在说（{{goodsDetailComments}}条评论）
    </div>
    <div v-else>还没有小伙伴进行评论哦！</div>
    <div class="comments-title" v-if="commentsList.length > 0">评价</div>
    <div class="comments-content" v-if="commentsList.length > 0">
      <div class="comments-item" v-for="(item,index) in commentsList" :key="index">
        <p class="flexBox center">
          <img class="avatar"
               :src="item.avatar">
        <span class="flexChild flexBox column">
          <span class="nickname">{{item.nickname}}</span>
          <span class="nickname">{{item.createTime}}</span>
        </span>
        <rater v-model="item.grade" :fontSize="18" :disabled="true" active-color="#d73b3c"></rater>
        </p>
        <p>{{item.content || '默认好评'}}</p>
        <div class="dsf">
          <img :src="i.image" class="commenImg" v-for="i, idx in item.imagesArray" @click="viewFullPhoto(idx, item.imagesArray)">
        </div>
      </div>
    </div>
    <div class="comments-more" @click="$router.push('/goodsDetail/' + $route.params.id + '/evaluateDetail')"
        v-if="commentsList.length > 0">
      <span>更多评价</span>
    </div>
    <PhotoViewer :data="currentImages" :index="currentPhotoIndex" v-model="showPhotos" v-if="showPhotos" />
  </section>
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
    computed: {
      commentsList () {
        return this.$store.state.GoodsDetail.goodsDetailComments
      },
      goodsDetailComments () {
        return this.$store.state.GoodsDetail.totalCommentNum
      }
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
  @import '~@/styles/noahcommon.scss';

  .dsf {
    overflow-x: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    img {
      display: block;
    }
  }

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
    padding: pr(18) pr(24);
    background: #fff;
    .comments-item {
      .nickname {
        line-height:pr(30);
      }
      &:not(:first-child) {
        border-top: 1px solid $lineColor;
        margin-top: pr(18);
        padding-top:pr(20);
      }
    }
  }

  .comments-title {
    font-size: $importantFontSize;
    color: $paragraphColor;
    padding: pr(18) pr(24);
    text-align: left;
    background: #fff;
    width: 100%;
  }

  .comments-more {
    background: #fff;
    text-align: center;
    margin: 0 auto;
    padding: pr(24);
    width: 100%;
    span {
      border-radius: pr(32);
      color: $mainFontColor;
      border: 1px solid $mainFontColor;
      line-height: pr(60);
      padding: pr(16) pr(42);
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

  .nickname {
    margin: 0 pr(20);
    text-align: left;
  }

  .avatar {
    width: pr(60);
    height: pr(60);
    border-radius: 50%;
  }

  section {
    padding: 0;
    line-height: pr(40);
    background: none;
    text-align: center;
    font-size: $normalFontSize;
    color: $supportTextColor;
  }
</style>
