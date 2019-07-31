const project=require('../model/api/apiProject')
async function addProject(ctx){
    const {name,type,version,teamId}=ctx.request.body
    let res=await project.insert({
        name:name,
        version:version,
        project_type:type,
        team_id:teamId
    })
    ctx.body={
        status:1,
        detail:'新建项目成功',
        item:res.dataValues
    }
}
async function getProjects(ctx){
    const {teamId}=ctx.request.body
    let res=await project.findByTeamId(teamId)
    ctx.body={
        detail:'获取项目成功',
        status:1,
        list:res
    }
}
async function deleteProject(ctx){
    const {projectId}=ctx.request.body
    await project.destroy(projectId)
    ctx.body={
        detail:'删除成功',
        status:1
    }
}
async function modifyProject(ctx){
    const {projectId,value}=ctx.request.body
    await project.update(projectId,{...value})
    ctx.body={
        detail:'修改成功',
        status:1
    }
}
module.exports=[
    {
        path:'/addProject',
        handler:addProject,
        method:'post'
    },
    {
        path:'/getProjects',
        handler:getProjects,
        method:'post'
    },
    {
        path:'/deleteProject',
        handler:deleteProject,
        method:'post'
    },
    {
        path:'/modifyProject',
        handler:modifyProject,
        method:'post'
    }
]