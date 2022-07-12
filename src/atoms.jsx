import { atom, selector } from "recoil";

export const data = atom({
  key: "data",
  default: [
    {
      id: 1,
      subject: "제목1",
      category: "음식"
    },
    {
      id: 2,
      subject: "제목2",
      category: "음식"
    },
    {
      id: 3,
      subject: "제목3",
      category: "스포츠"
    },
    {
      id: 4,
      subject: "제목4",
      category: "음식"
    },
  ]
});

export const category = atom({
  key: "category",
  default: "음식"
})

// 내 데이터를 원하는 형태로 가공해서 출력, 수정하고 싶을 때 사용
export const select = selector({
  key: "data2",
  get: ({get}) => {
    const oldList = get(data);
    const cat = get(category);
    return oldList.filter((v) => v.category === cat);
  },
  set: ({set}, newValue) => {
    set(data, newValue)
    console.log(newValue);
  }
});