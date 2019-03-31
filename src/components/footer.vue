<template>
  <div>
    <footer class="footer">
      <div class="container">
        <h3>Pages:</h3>
        <b-list-group horizontal class="d-flex justify-content align-items-center">
          <b-list-group-item>
            <router-link to="/" active-class="active">Home</router-link>
          </b-list-group-item>
          <b-list-group-item>
            <router-link to="/random">Random</router-link>
          </b-list-group-item>
        </b-list-group>
      </div>
    </footer>
  </div>
</template>

<style>
.footer {
  position: absolute;
  bottom: 0;
  color: white;
  text-align: left;
}
</style>