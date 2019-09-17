const instance = require("../model/test/testInstance");
const activity = require("../model/test/testActivity");
const project = require("../model/test/testProject");
async function addTestInstance(ctx) {
  const { meta, request, projectId } = ctx.request.body;
  const updator = ctx.username;
  await instance.insert({
    ...meta,
    request,
    project_id: projectId,
    group_id: meta.group,
    updator
  });
  ctx.body = {
    detail: "新建成功",
    status: 1
  };
}
async function getTestInstances(ctx) {
  const { id } = ctx.query;
  let res = await instance.findByProjectId(id);
  ctx.body = {
    detail: "获取测似用例成功",
    status: 1,
    list: res
  };
}

async function deleteTest(ctx) {
  const { id, projectId } = ctx.request.body;
  let res = await instance.findById(id);
  const operator = ctx.username;
  await instance.destroy(id);
  activity.insert({
    project_id: projectId,
    activity_type: "delete",
    to_object: "group",
    operator: operator,
    description: `${operator}删除了api(${res[0].dataValues.name})`
  });
  project.update(projectId, {
    random: Math.random().toString()
  });
  ctx.body = {
    detail: "删除成功",
    status: 1
  };
}
async function updateTest(ctx) {
  const { id, data } = ctx.request.body;
  const { meta,request} = data;
  const operator = ctx.username;
  await instance.update(id, {
    ...meta,
    request,
    operator
  });
  ctx.body = {
    detail: "修改成功",
    status: 1
  };
}

module.exports = [
  {
    handler: addTestInstance,
    path: "/test/instance",
    method: "post"
  },
  {
    handler: getTestInstances,
    path: "/test/instances",
    method: "get"
  },
  {
    handler: deleteTest,
    path: "/test/delete",
    method: "post"
  },
  {
    handler: updateTest,
    path: "/test/update",
    method: "post"
  }
];
