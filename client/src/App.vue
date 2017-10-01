<template>
  <div id="app">

    <!-- Highlighted template to show its details -->
    <div id="large">
      <div class="group">
        <img v-bind:src="imageLink" alt="Large Image" width="430" height="360" />
        <div class="details">
          <p><strong>Title</strong> {{template.title}}</p>
          <p><strong>Description</strong> {{template.description}}</p>
          <p><strong>Cost</strong> ${{template.cost}}</p>
          <p><strong>ID #</strong> {{template.id}}</p>
          <p><strong>Thumbnail File</strong> {{template.thumbnail}}</p>
          <p><strong>Large Image File</strong> {{template.image}}</p>
        </div>
      </div>
    </div>

    <!-- List of thumbnail templates to show in the scroll -->
    <div class="thumbnails">
      <div class="group">
        <div v-for="template in scrollTemplates">
          <a v-bind:href="'#'" v-on:click="updateTemplate(template.id)" v-bind:class="setActive(template.id)" v-bind:title="template.id">
            <img v-bind:src="thumbnailURL + template.thumbnail" v-bind:alt="template.id + '-m'" width="145" height="121" />
            <span>{{template.id}}</span>
          </a>
        </div>
        <a v-on:click="movePrev()" v-bind:class="disablePrev" class="previous" title="Previous">Previous</a>
        <a v-on:click="moveNext()" v-bind:class="disableNext" class="next" title="Next">Next</a>
      </div>
    </div>
  </div>

  </div>
</template>

<script>
// import Api to connect to our server
import Api from './services/Api'
export default {
  name: 'app',
  data () {
    return {
      /*
        currentScroll: stores number of scroll views (increments by 4 only)
        imageURL: stores URL to get big image from the server
        thumbnailURL: stores URL to get thumbnail URL from ther server
        templates: stores the templates that are being shown in the thumbnails
        template: current template highlighted whose data is displayed in large
        imageLink: link of the big image for highlighted template
      */
      currentScroll: 0,
      imageURL: Api.URL + '/images/large/',
      thumbnailURL: Api.URL + '/images/thumbnails/',
      templates: [],
      template:  {},
      imageLink: ''
    }
  },
  computed: {
    // returns the templates that are shown in thumbnails
    scrollTemplates: function () {
      return this.templates.slice(Number(this.currentScroll), this.currentScroll +  4)
    },
    // returns disabled for next arrow class if there are no thumbnails to show
    disableNext: function () {
      if(this.canMoveNext() === false){
          return 'disabled'
      }
    },
    // returns disabled for prev arrow class if there are not thumbnails to show
    disablePrev: function () {
      if(this.canMovePrev() === false){
        return 'disabled'
      }
    }
  },
  created () {
    // calls the server API to get the data
    Api.axiosInstance.get('/').then((response) => {
      this.templates = response.data
      this.showTemplate(response.data[0])
    })
  },
  methods: {
    // sets the current highlighted template
    showTemplate: function(template){
      this.template = template
      this.imageLink = this.imageURL + template.image
    },
    // updates currentScroll to next 4 thumbnails
    moveNext: function(){
      if(this.canMoveNext()){
        this.currentScroll +=  4
      }
    },
    // updates currentScroll to prev 4 thumbnails
    movePrev: function(){
      if(this.canMovePrev()){
        this.currentScroll -= 4
      }
    },
    // returns a boolean value if next 4 thumbnails are available
    canMoveNext: function(){
      if(this.templates[this.currentScroll + 4] === undefined){
        return false
      }
      return true
    },
    // returns a boolean value if prev 4 thumbnails are available
    canMovePrev: function(){
      if(this.templates[this.currentScroll - 4] === undefined){
        return false
      }
      return true
    },
    // updates the current highlighted template if a thumbnail is clicked
    updateTemplate: function(id){
      var template = this.templates.filter((template) => {
        return template.id == id
      })
      this.showTemplate(template[0])
    },
    // sets active class on highlighted template
    setActive: function (id) {
      if(this.template.id == id){
        return 'active'
      }
    }
  }
}
</script>

<style>
  @import './assets/style/component.css';
</style>
