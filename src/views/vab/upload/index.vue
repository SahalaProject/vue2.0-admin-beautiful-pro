<template>
  <div class="upload-container">
    <el-divider content-position="left">演示环境可能无法模拟上传</el-divider>
    <vab-upload
      ref="vabUpload"
      url="/upload"
      name="file"
      :limit="50"
      :size="2"
    ></vab-upload>
    <el-button type="primary" @click="handleShow({ key: 'value' })">
      模拟上传
    </el-button>

  <div style="margin-top: 20px">
    <el-upload
          class="upload-demo"
          ref="upload"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-change="handleChange"
          :file-list="fileList"
          :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
          <div slot="tip" class="el-upload__tip">上传文件不超过500kb</div>
        </el-upload>
  </div>

  </div>  
</template>

<script>
  import VabUpload from '@/components/VabUpload'
  import { uploadFile } from '@/api/vabUpload'

  export default {
    name: 'Upload',
    components: {
      VabUpload,
    },
    data() {
      return {
        fileList: []
      }
    },
    methods: {
      handleShow(data) {
        this.$refs['vabUpload'].handleShow(data)
      },


    // 文件上传
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
        // this.fileList = [];
        // console.log('置空后 无效: ', this.fileList)

        // console.log('传入的fileList 刷新页面前保持所有选的文件:', fileList)
        if (fileList.length > 1){
          console.log('长度大于1: ', fileList.length)
           this.fileList = fileList.splice(1, 1);  // 只支持选一个，每次选第二个时删除第一个
        }else{
           this.fileList = fileList;  // 首次选择
        }
        // console.log('选择后: ', this.fileList)
    },
    // 上传文件
    submitUpload(){
        let formData = new FormData();
        const fileList = this.fileList
            fileList.forEach(item => {
                formData.append("file", item.raw);
            });
            formData.append('form', '其他参数')

        const response = uploadFile(formData)
        this.$message.success('上传成功 !');
    },  
    
    },
  }
</script>
