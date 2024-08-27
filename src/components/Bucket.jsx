import { useState } from 'react';
import BucketForm from './BucketForm';

function Bucket(props) {
  const [edit, setEdit] = useState({
    id: null,
    value: '',
    eagerness: '',
  });

  console.log(props.bucket);

  const submitUpdate = (value) => {
    value.id = edit.id;
    props.editBucketItem(value.id, value);
    setEdit({
      id: null,
      value: '',
      eagerness: '',
    });
  };

  const completeBucketItem = (id) => {
    let updatedBucket = props.bucket.map((item) => {
      if (item.id === id) {
        item.isComplete = !item.isComplete;
      }
      return item;
    });
  };

  const removeBucketItem = (id) => {
    const updatedBucket = props.bucket.filter((item) => item.id !== id);
    props.setBucket(updatedBucket);
  };

  if (edit.id) {
    return <BucketForm edit={edit} onSubmit={submitUpdate} />;
  }

  return props.bucket.map((item, index) => (
    <div className={`bucket-row ${item.eagerness}`} key={index}>
      <div onClick={() => completeBucketItem(item.id)}>
          {item.text}
      </div>
      <div className="icons">
        <p onClick={() => setEdit({ id: item.id, value: item.value, eagerness: item.eagerness })}> ✏️</p>
        <p onClick={() => removeBucketItem(item.id)}> 🗑️</p>
      </div>
    </div>
  ));
}

export default Bucket;
