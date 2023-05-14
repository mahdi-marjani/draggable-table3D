let table = document.querySelector("table");
let tbody = table.querySelector("tbody");
let data = [
  { site: "Google", views: "9518", clicks: "6369", average: "01:32:50" },
  { site: "Twitter", views: "7326", clicks: "10437", average: "00:51:22" },
  { site: "Amazon", views: "4162", clicks: "5327", average: "00:24:34" },
  { site: "Linkedin", views: "3654", clicks: "2961", average: "00:12:10" },
  { site: "TopLearn", views: "2002", clicks: "4135", average: "00:46:19" },
  { site: "GitHub", views: "4623", clicks: "3486", average: "00:31:52" },
];
for (let i = 0; i < data.length; i++) {
  let tr = document.createElement("tr");
  tr.innerHTML = `
  <td>${data[i].site}</td>
  <td>${data[i].views}</td>
  <td>${data[i].clicks}</td>
  <td>${data[i].average}</td>
  <td>${i + 1}</td>
  `;
  tbody.appendChild(tr);
}
function slist(target) {
  target.classList.add("slist");
  let items = target.getElementsByTagName("tr"),
    current = null;
  for (let i of items) {
    i.draggable = true;

    i.ondragstart = (e) => {
      current = i;
      for (let it of items) {
        if (it != current) {
          it.classList.add("hint");
        }
      }
    };
    i.ondragenter = (e) => {
      if (i != current) {
        i.classList.add("active");
      }
    };
    i.ondragleave = () => i.classList.remove("active");

    i.ondragend = () => {
      for (let it of items) {
        it.classList.remove("hint");
        it.classList.remove("active");
      }
    };
    i.ondragover = (e) => e.preventDefault();
    i.ondrop = (e) => {
      e.preventDefault();
      if (i != current) {
        let currentpos = 0,
          droppedpos = 0;
        for (let it = 0; it < items.length; it++) {
          if (current == items[it]) {
            currentpos = it;
          }
          if (i == items[it]) {
            droppedpos = it;
          }
        }
        if (currentpos < droppedpos) {
          i.parentNode.insertBefore(current, i.nextSibling);
        } else {
          i.parentNode.insertBefore(current, i);
        }
      }
    };
  }
}
slist(document.getElementById("sortlist"));
