import { useDispatch, useSelector } from 'react-redux';
import { loadNewPhotos } from '../store/photos';
import styles from './PhotosLoadMore.module.css';
import Loading from './Helper/Loading';

const PhotosLoadMore = () => {
  const { pages, infinite, loading } = useSelector((state) => state.photos);
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(loadNewPhotos(pages + 1));
  }

  if (loading) return <Loading />;
  if (!infinite) return null;
  return (
    <button onClick={handleClick} className={styles.button}>
      +
    </button>
  );
};

export default PhotosLoadMore;
