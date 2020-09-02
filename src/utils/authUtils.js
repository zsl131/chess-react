const LOGIN_USER_SESSION = "loginUser";
const NAV_MENU_SESSION = "navMenus";
const AUTH_MENU_SESSION = "authMenus";
const DEP_SESSION = "depIds";
const IS_TEACHER = "isTeacher";
const SYSTEM_LIST = "systemList";
const CLASSROOM_LIST = "classroomList"; //教师对应的班级
const TEACHER = "loginTeacher"; //登陆的教师信息

const NO_NEED_AUTH = ["/admin/index"];

/** 如果是教师用户则设置相应信息 */
export function setTeacherInfo(data) {
  const isTeacher = data.isTeacher;
  if(isTeacher) {
    const systemList = data.systemList;
    sessionStorage.setItem(SYSTEM_LIST, JSON.stringify(systemList));
    const classroomList = data.classroomList;
    console.log(classroomList==null || classroomList.length<=0)
    /*if(classroomList==null || classroomList.length<=0) {
      router.push("/yard/teacherClassroom");
    }*/
    sessionStorage.setItem(CLASSROOM_LIST, JSON.stringify(classroomList)); //教师对应的班级
    sessionStorage.setItem(TEACHER, JSON.stringify(data.teacher)); //教师信息
  }
  sessionStorage.setItem(IS_TEACHER, isTeacher);
}

/** 获取登陆的教师信息 */
export function getTeacherInfo() {
  const teaStr = sessionStorage.getItem(TEACHER);
  if(teaStr) {
    return JSON.parse(teaStr);
  } else {return null;}
}

/**
 * 存储班级信息，当教师添加班级时调用
 * @param classroomList
 */
export function setTeacherClassroom(classroomList) {
  sessionStorage.setItem(CLASSROOM_LIST, JSON.stringify(classroomList)); //教师对应的班级
}

/**
 * 获取教师对应的班级
 * @returns {null|any}
 */
export function getTeacherClassroom() {
  const roomStr = sessionStorage.getItem(CLASSROOM_LIST);
  if(roomStr) {
    const roomList = JSON.parse(roomStr);
    return roomList;
  } else {
    return null;
  }
}

/** 登陆时调用该方法 */
export function setLoginUser(loginObj, token) {
  let loginUser = loginObj.user;
  loginUser.loginToken = token;
  const navMenus = loginObj.navMenus;
  const authMenus = loginObj.authMenus;
  const depIds = loginObj.depIds;
  //console.log(loginObj)
  sessionStorage.setItem(LOGIN_USER_SESSION, JSON.stringify(loginUser));
  sessionStorage.setItem(NAV_MENU_SESSION, JSON.stringify(navMenus));
  sessionStorage.setItem(AUTH_MENU_SESSION, JSON.stringify(authMenus));
  sessionStorage.setItem(DEP_SESSION, JSON.stringify(depIds));
}

export function getAuthMenus() {
  return JSON.parse(sessionStorage.getItem(AUTH_MENU_SESSION));
}

/** 在绑定手机号码等修改用户属性时调用，只修改登陆用户信息 */
export function setLoginUserOnly(loginUser) {
  sessionStorage.setItem(LOGIN_USER_SESSION, JSON.stringify(loginUser));
}

function getSessionValue(field) {
  const str = sessionStorage.getItem(field);
  if(str === null || str === '' || str === undefined) {return null;}
  else {return JSON.parse(str);}
}

/** 获取登陆用户 */
export function getLoginUser() {
  return getSessionValue(LOGIN_USER_SESSION);
}

/** 获取用户关联的部门ID数组 */
export function getDepIds() {
  return getSessionValue(DEP_SESSION);
}

/** 检测是否有用户登陆 */
export function checkLogin() {
  const loginUser = getLoginUser();
  if(loginUser!=null && loginUser!=undefined) {
    return true;
  }
  return false;
}

//不需要检测权限的，但需要登陆
const NO_NEED_CHECK = ["/admin/users/updatePwd"];

//教师用户专属的忽略路径
const TEACHER_NO_NEED_CHECK = ["/admin/teacherCourse", "/yard/teacherClassImage", "/yard/index"];

/** 通过url检测权限 */
export function checkAuthByUrl(pathname) {
  if(NO_NEED_CHECK.includes(pathname)) {return true;}
  if(sessionStorage.getItem("isTeacher")==='true' && TEACHER_NO_NEED_CHECK.includes(pathname)) {return true;} //如果是教师用户并包含忽略路径
  let hasAuth = false;
  NO_NEED_AUTH.map((url) => {
    if(pathname == url) {hasAuth = true;}
  });
  if(hasAuth) {return hasAuth;}
  else {
    const authMenus = JSON.parse(sessionStorage.getItem(AUTH_MENU_SESSION));
    const navMenus = JSON.parse(sessionStorage.getItem(NAV_MENU_SESSION));

    navMenus.map((item) => {
      if (item.menu.href == pathname) {
        hasAuth = true;
      }
      if (!hasAuth) {
        item.children.map((menu) => {
          if (menu.href == pathname) {
            hasAuth = true;
          }
        })
      }
    });

    if (!hasAuth) {
      authMenus.map((menu) => {
        if (menu.href == pathname) {
          hasAuth = true;
        }
      })
    }
    return hasAuth;
  }
}
