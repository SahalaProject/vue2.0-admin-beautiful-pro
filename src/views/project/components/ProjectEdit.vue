<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="95px" style="width:75%; margin: 0 auto;" >
      <el-form-item label="需求ID：" prop="caseid" >
        <el-input v-model.trim="form.caseid" autocomplete="off">></el-input>
      </el-form-item>
      <el-form-item label="迭代号：" prop="iteration">
        <el-input v-model.trim="form.iteration" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="创建人：" prop="username">
        <el-input v-model.trim="form.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="用例类型：" prop="casestype">
        <el-select v-model.trim="form.selectedType" placeholder="请选择用例类型" autocomplete="off" style="width:100%"> 
          <!-- 循环遍历 JS 中 casestype 的值 -->
          <el-option v-for="item in form.casestype" :key="item.key" :label="item.label" :value="item.key"></el-option> 
        </el-select>
      </el-form-item>
      <el-form-item label="转换类型：" prop="excel_type" autocomplete="off">
        <el-radio-group v-model="form.excel_type" style="width:275px"> 
          <el-radio border v-model.trim="form.excel_type" label="1">基线用例库</el-radio>
          <el-radio border v-model.trim="form.excel_type" label="2">Xmind转Excel</el-radio>
        </el-radio-group>
      </el-form-item>


    <el-form-item label="上传文件" prop="file" autocomplete="off">
        <el-upload
        class="upload-demo"
        action="Fake Action"
        :on-change="handleChange"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :auto-upload="false"
        :file-list="form.fileList">
        <el-button size="small" type="primary">选择文件</el-button>  
        <div slot="tip" class="el-upload__tip"></div>
        <div slot="tip" class="el-upload-list__item-name">{{this.form.fileName}}</div>
        </el-upload>
    </el-form-item>


    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">生成用例</el-button>
    </div>
    
  

    
  </el-dialog>
</template>

<script>
    import { doEdit } from '@/api/userManagement'

  export default {
    name: 'ProjectEdit',    
    data() {
      return {
        form: {
          caseid: '',
          iteration: '',
          username:'',
          excel_type: '',
          fileList: [],
          fileName: '',
          casestype:[
          {
            key: '功能测试',
            label: '功能测试'
          },
          {
            key: '性能测试',
            label: '性能测试'
          },
          {
            key: '安全性测试',
            label: '安全性测试'
          },
          {
            key: '其他',
            label: '其他'
          }
        ],
        selectedType: '功能测试',

        },
        rules: {
          excel_type: [
            { required: true, message: '请选择：转换类型 ', trigger: 'change' },
          ],
        },
        title: '',
        dialogFormVisible: false,
      }
    },
    created() {},
    methods: {
      showEdit(row) {
        if (!row) {
          this.title = '用例转换'
        } else {
          this.title = '编辑'
          this.form = Object.assign({}, row)
        }
        this.dialogFormVisible = true
      },
      close() {
        this.$refs['form'].resetFields()
        this.form = this.$options.data().form
        this.dialogFormVisible = false
        this.$emit('fetch-data')
      },
      save() {
        this.$refs['form'].validate(async (valid) => {
          if (valid) {
            let formData = new FormData();  // 文件上传，必须 new FormData();
            const fileList = this.form.fileList
                fileList.forEach(item => {
                    formData.append("files", item.raw);
                });
                formData.append('form', JSON.stringify(this.form)) // 上传的数据，必须要为json格式
            const { data } = await doEdit(formData)
            this.$baseMessage(data.msg)
            this.$refs['form'].resetFields()
            this.dialogFormVisible = false
            this.$emit('fetch-data')
            this.form = this.$options.data().form
          } else {
            return false
          }
        })
      },


    // 文件上传的JS
    handleRemove(file, fileList) {
        console.log(file, fileList);
    },
    handlePreview(file) {
        console.log(file);
    },
    beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
    },

    // 选择文件
    handleChange(file, fileList){
        const extension = file.name.split('.')[1] === 'xmind'
        if (!extension) {
            this.$message.warning('仅支持 xmind 格式的文件!');
            this.form.fileList = [];
        }else{
            if(fileList.length > 1) {
              this.form.fileList = [fileList[1]] // 只获取最后上传的文件
            } else {
              this.form.fileList = fileList
            }
        }
     },  

    },
  }
</script>
