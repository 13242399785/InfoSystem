<template>
  <div class="content_left">
    
    <p class="top_title" @click="getTree">选择建筑</p>
    <div class="tree_select">
      <span class="posi-serch" @click="search"></span>
      <el-input
    placeholder="输入关键字搜索"
    suffix-icon="el-icon-search"
    v-model="buildSearch">
    
  </el-input>
      <!-- <input type="text" v-model="buildSearch"> -->
      <!-- <div class="tree_select_btn" @click="search">查询</div> -->
    </div>
    <el-tree
      :data="tree"
      :style="'height:'+treeHeight+'px;'"
      :props="defaultProps"
      @node-click="handleNodeClick"
      node-key="id"
      ref="tree"
      highlight-current
      :default-expand-all='true'
      :expand-on-click-node="false"
      :filter-node-method="filterNode"
    >
      <span class="custom-tree-node" slot-scope="{ node}">
        <span class="iconfont" :class="levelIcon(node)"></span>
        <span>{{ node.label }}</span>
      </span>
    </el-tree>
  </div>
</template>
<script>

export default {
  props: ["url"],
  data() {
    return {
      treeHeight: 500,
      buildSearch: null, //查找建筑
      tree: [], //树形图数据
      defaultProps: {
        children: "childList",
        label: "orgName"
      },
      expandArr: [],
      apiUrl: this.url || "api/Exp/Monitor/GetYdCustOnCoInfoList"
    };
  },
  created(){
    
    
  },
  mounted() {
    var that = this;
    // that.getHeight();
    setTimeout(function(){
      that.getTree();
    },200)
    // window.onresize = function() {
    //   that.getHeight();
    // };
  },
  methods: {
    getHeight() {
      // 获取窗口高度
      var winHeight;
      if (window.innerHeight) {
        winHeight = window.innerHeight;
      } else if (document.body && document.body.clientHeight) {
        winHeight = document.body.clientHeight;
      }
      this.treeHeight = winHeight - 225;
    },
    search() {
      // 查找数据
      this.$refs.tree.filter(this.buildSearch);
    },
    getTree() {
      const that = this;
      this.$api.getThreemenu().then(res=>{
          // console.log(res.data.Data)
          if(res.data.Code==0){
            var treeArr = res.data.Data;
            that.tree = treeArr;
            var currentId = that.tree[0].id;
            that.$nextTick(function() {
              that.$refs.tree.setCurrentKey(currentId);
            });
            that.emitData(currentId, false);
          }else{
            that.getTree();
            // console.log(res.data)
          }
      }).catch((error) => {
        // that.getTree();
        console.error(error);
      })
    },
    levelIcon(node) {
      // 设置节点图标
      var level = node.level;
      var icon = "icon-room text-green";
      if (level === 1) {
        icon = "icon-city text-purple";
      } else if (level === 2) {
        icon = "icon-city2 text-greenBlue";
      } else if (level == 3) {
        icon = "icon-building text-orange";
      } else if (level == 4) {
        icon = "icon-hotel text-red";
      } else if (level == 5) {
        icon = "icon-build text-blue";
      } else if (level == 6) {
        icon = "icon-home text-green";
      }
      return icon;
    },
    filterNode(value, data) {
      // 数据查找结果填充
      if (!value) return true;
      return data.orgName.indexOf(value) !== -1;
    },
    handleNodeClick(data, node) {
      // 点击节点触发事件，向父组件传递当前选中id
      var isRoom = false;
      if (node.level === 6) {
        isRoom = true;
      }
      this.emitData(this.$refs.tree.getCurrentKey(), isRoom);
    },
    emitData(id, isRoom) {
      this.$emit("buildId", id, isRoom);
    }
  }
};
</script>
<style lang="scss">
.content_left{
  min-width: 250px;
  overflow: auto;
  .el-tree{
    color: #fff;
    font-size: 14px;
  }
}
.tree_select{
  position: relative;
  .posi-serch{
    position: absolute;
    right: 0;
    width: 34px;
    height: 34px;
    display: inline-block;
    background: none;
    cursor: pointer;
    z-index: 9;
  }
}
  .el-tree{
    .el-tree-node__expand-icon.expanded{
      transform:rotate(0deg);
      -webkit-transform: rotate(0deg);
    }
    .el-icon-caret-right:before{
      content: "\E602";
      font-size:18px;
      // color: #83ace1;
    }
    .el-tree-node__expand-icon.expanded.el-icon-caret-right:before{
      content: "\E63c";
      font-size: 18px;
      // color: #83ace1;
      
    }
    .el-tree-node__expand-icon.is-leaf:before{
      color: #d07e5a;
      content: "\E614";
    }
  }

</style>


