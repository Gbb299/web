// const { template } = require("express-art-template")

$.ajax({
    // 前端渲染
    url:'/api/list',
    success(result) {

        // let html = '<ul>'
        // $.each(result.data, (index, value) => {
        //     html += '<li>'+ value +'</li>'
        // })
        // html += '</ul>'
        
        let templateStr = `
        <ul>
            {{each data}}
              <li>{{$value }}</li>
            {{/each}}
        </ul>
        `
        let html = template.render(templateStr, {
            data: result.data
        })

        $('#list').html(html)
    }
})