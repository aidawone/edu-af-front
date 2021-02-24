<template>
  <div class="app-container">
    <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;" />

    <el-tree
      ref="tree2"
      :data="items"
      :props="defaultProps"
      :filter-node-method="filterNode"
      class="filter-tree"
      default-expand-all
    />
  </div>
</template>

<script>
import Subject from '@/api/edu/subject'

export default {
  created() {
    this.getSubjectList()
  },
  data() {
    return {
      filterText: '',
      items: [],
      defaultProps: {
        children: 'child',
        label: 'title'
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.title.toLowerCase().indexOf(value.toLowerCase()) !== -1
    },
    getSubjectList() {
      Subject.getSubjectTree().then(response => {
        this.items = response.data.items  
      })
    }
  }
}
</script>

