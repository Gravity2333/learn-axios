import request, { API_PREFIX } from "./request/request";
import {AbortController,CancelToken} from './lib/MyAxios'

const table = document.querySelector('#dataContainer table')
const queryBtn = document.querySelector('#operateContainer #queryBtn')
const cancelBtn = document.querySelector('#operateContainer #cancelBtn')
const cleanBtn = document.querySelector('#operateContainer #cleanBtn')
const cancelAbortConrtollerBtn = document.querySelector('#operateContainer #cancelAbortConrtollerBtn')
const loadingSpin = document.querySelector('#dataContainer #loading')
let source = null

let abortController: AbortController = null
function setTableData(dataSource: any[]) {
  const header = table.innerHTML?.split("</tr>")[0] + "</tr></tbody>"
  let content = ""
  dataSource.forEach(userInfo => {
    content += `
    <tr>
        <td>
            ${userInfo.name}
        </td>
        <td>
             ${userInfo.age}
        </td>
        <td>
             ${userInfo.score}
        </td>
    </tr>
    `
  })

  table.innerHTML = header + content
}

const fetch = async () => {
  (loadingSpin as any).style.display = 'flex';
  /** 创建cancelToken */
  source = CancelToken.source();
  if(abortController&&!abortController.aborted){
    // 取消上一次请求
    abortController.abort()
    abortController = null;
  }
  abortController = new AbortController();
  const { success, data: userInfos } = await request.get<{
    name: string,
    age: number,
    score: number
  }[]>(`${API_PREFIX}/users/list`, {
    cancelToken: source.token,
    signal: abortController.signal
  });

  if (success) {
    setTableData(userInfos)
  }
  (loadingSpin as any).style.display = 'none'
}

queryBtn.addEventListener('click', () => {
  fetch()
})

cancelBtn.addEventListener('click', () => {
  source?.cancel('ERR')
})

cancelAbortConrtollerBtn.addEventListener('click', () => {
  abortController?.abort()
})

cleanBtn.addEventListener('click', () => {
  setTableData([])
})
