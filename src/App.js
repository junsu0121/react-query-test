import { MutationCache, useMutation, useQuery } from "react-query";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { queryClient } from "./index";

function App() {
  // { data, isLoading }
  const query = useQuery(
    "moum",
    async () => {
      const response = await axios.get("http://localhost:5001/test");
      return response.data;
    },
    {
      onError: (err) => {
        console.log(err);
      }
    }
  );

  const { mutate } = useMutation(
    "moum",
    async (data) => {
      const response = await axios.post("http://localhost:5001/test", data);
      return response.data;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("moum");
        console.log(data);
      }
    }
  )


  const { mutate: modify } = useMutation(
    "moum",
    async ({ id, data }) => {
      const response = await axios.patch(`http://localhost:5001/test/${id}`, data);
      return response.data;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("moum");
        console.log(data);
      }
    }
  )



  const { mutate: remove } = useMutation(
    "moum",
    async (id) => {
      const response = await axios.delete(`http://localhost:5001/test/${id}`);
      return response.data;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("moum");
        console.log(data);
      }
    }
  )

  const ref = useRef(null);
  const onClick = (e) => {
    const data = {
      subject: ref.current.value
    }

    mutate(data);
  }

  const clickModify = (id) => {
    modify({
      id,
      data: {
        subject: "test"
      }
    })
  }

  const clickRemove = (id) => {
    remove(id);
  }

  return (
    <div>
      {
        query.isLoading ? <div>로딩중</div> :
          query.data.map((v, i) => {
            return <div key={i}>
              <div>{v.subject}</div>
              <button onClick={() => clickModify(v.id)}>수정</button>
              <button onClick={() => clickRemove(v.id)}>삭제</button>
            </div>
          })
      }
      <input type="text" ref={ref} />
      <button onClick={onClick}>전송</button>
    </div>
  );
}

export default App;
