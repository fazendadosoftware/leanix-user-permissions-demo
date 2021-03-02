<template>
  <div>
    User Role:
    <pre>
      {{userRole}}
    </pre>
    WorkspacePermissions
    <pre>
      {{workspacePermissions}}
    </pre>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userInfo: null,
      workspacePermissions: null,
      userRole: null
    }
  },
  async created () {
    const { settings: { baseUrl, currentUser: { id: userId }, workspace: { id: workspaceId } } } = await this.$lx.init()
    const instance = baseUrl.split('//')[1].split('/')[0]
    const mtmApiEndpoint = `https://${instance}/services/mtm/v1/users/${userId}`
    this.userInfo = await this.$lx.executeParentOriginXHR('GET', mtmApiEndpoint)
      .then(({ status, body }) => status === 200 ? JSON.parse(body).data : Promise.reject(status))
    this.workspacePermissions = this.userInfo.permissions
      .find(({ workspaceId: wsId }) => wsId === workspaceId)
    this.userRole = this.workspacePermissions.role
  }
}
</script>
