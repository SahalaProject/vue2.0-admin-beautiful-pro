<template>
  <div class="userManagement-container">
    <vab-query-form>
      <vab-query-form-left-panel :span="12">

        <el-button icon="el-icon-plus" type="primary" @click="handleEdit">
          添加
        </el-button>
        <el-button icon="el-icon-delete" type="danger" @click="handleDelete">
          批量删除
        </el-button>

      </vab-query-form-left-panel>


      <vab-query-form-right-panel :span="12">
        <el-form :inline="true" :model="queryForm" @submit.native.prevent>
          <el-form-item>
            <el-input
              v-model.trim="queryForm.username"
              placeholder="请输入用户名"
              clearable
            />
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="queryData">
              查询
            </el-button>
          </el-form-item>
        </el-form>
      </vab-query-form-right-panel>
    </vab-query-form>

    <el-table
      v-loading="listLoading"
      :data="list"
      :element-loading-text="elementLoadingText"
      @selection-change="setSelectRows"
    >
      <el-table-column show-overflow-tooltip type="selection"></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="id"
        label="id"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="name"
        label="名称"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="desc"
        label="描述"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="responsible"
        label="维护人"
      ></el-table-column>

      <el-table-column show-overflow-tooltip label="权限">
        <template #default="{ row }">
          <el-tag v-for="(item, index) in row.permissions" :key="index">
            {{ item }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column
        show-overflow-tooltip
        prop="update_time"
        label="修改时间"
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="操作" width="200">
        <template #default="{ row }">
          <el-button type="text" @click="handleEdit(row)">编辑</el-button>
          <el-button type="text" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      :current-page="queryForm.pageNo"
      :page-size="queryForm.pageSize"
      :layout="layout"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>
    <project-edit ref="edit" @fetch-data="fetchData"></project-edit>
  </div>
</template>

<script>
  import { getList, doDelete, getProjectList } from '@/api/project'
  import ProjectEdit from './components/ProjectEdit'

  export default {
    name: 'Project',
    components: { 
      ProjectEdit
     },
    data() {
      return {
        list: null,
        listLoading: true,
        layout: 'total, sizes, prev, pager, next, jumper',
        total: 0,
        selectRows: '',
        elementLoadingText: '正在加载...',
        queryForm: {
          pageNo: 1,
          pageSize: 10,
          username: '',
        },

      }
    },
    // created() {
    //   this.fetchData()
    // },
    // 当前项目由于路由设计特点，切换路由过程钩子中方法在路由变化时加载，否则出现路由变了请求未发送（除了首页、401、404、register、login）
    activated() {  // 使用vue路由时再子路由间切换发现路由参数变换但请求不重发问题
      this.fetchData()
    },
    methods: {
      setSelectRows(val) {
        this.selectRows = val
      },
      handleEdit(row) {
        if (row.id) {
          this.$refs['edit'].showEdit(row)
        } else {
          this.$refs['edit'].showEdit()
        }
      },
      handleDelete(row) {
        if (row.id) {
          this.$baseConfirm('你确定要删除当前项吗', null, async () => {
            const { msg } = await doDelete({ ids: row.id })
            this.$baseMessage(msg, 'success')
            this.fetchData()
          })
        } else {
          if (this.selectRows.length > 0) {
            const ids = this.selectRows.map((item) => item.id).join()
            this.$baseConfirm('你确定要删除选中项吗', null, async () => {
              const { msg } = await doDelete({ ids })
              this.$baseMessage(msg, 'success')
              this.fetchData()
            })
          } else {
            this.$baseMessage('未选中任何行', 'error')
            return false
          }
        }
      },
      handleSizeChange(val) {
        this.queryForm.pageSize = val
        this.fetchData()
      },
      handleCurrentChange(val) {
        this.queryForm.pageNo = val
        this.fetchData()
      },
      queryData() {
        this.queryForm.pageNo = 1
        this.fetchData()
      },
      async fetchData() {
        this.listLoading = true
        const { data, totalCount } = await getProjectList({'page': this.queryForm.pageNo, 'size': this.queryForm.pageSize})
        this.list = data.results
        this.total = data.count
        setTimeout(() => {
          this.listLoading = false
        }, 300)
      },
    },
  }
</script>
