
const apiUrl = 'https://api.github.com/repos/twbs/bootstrap/releases'
$.get(apiUrl).then((data) =>
// jquery get request takes the data from the api, forEach method performs the function on each element to then append to the table body
  data.forEach((release) => {
    $('tbody').append(
      $(`
    <tr>
      <td>${release.id}</td>
      <td>${release.created_at}</td>
      <td>${release.tag_name}</td>
      <td>${release.url}</td>
    </tr>`)
    )// template literal fills in the table body dynamically
  })
)