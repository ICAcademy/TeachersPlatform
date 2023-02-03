import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

// HOC
import { withSnackbar } from 'components/withSnackbar/withSnackbar';

// Functions
import { isPigSymbol } from 'hooks/useInput';

//Components
import AdminLessons from './AdminLessons/AdminLessons';
import ImageSpinner from 'components/common/ImageSpinner/ImageSpinner';

//Services
import {
  createMaterial,
  deleteMaterial,
  updateMaterial,
  uploadImage,
} from 'services/MaterialsService/MaterialsService';

//Styles
import styles from './MaterialForm.module.scss';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import ImageIcon from '@mui/icons-material/Image';
import FormHelperText from '@mui/material/FormHelperText';
import DeleteIcon from '@mui/icons-material/Delete';

const CreateMaterial = ({ material, levels, create, snackbarShowMessage }) => {
  const [unitTitle, setUnitTitle] = useState(material.unit || '');
  const [selectedLevel, setSelectedLevel] = useState(material.level || '');
  const [lessons, setLessons] = useState(material.lessons);
  const [imgUrl, setImgUrl] = useState(material.image || '');
  const [saveBtn, setSaveBtn] = useState(false);
  const [error, setError] = useState({
    unitTitleError: false,
    selectedLevelError: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setUnitTitle(unitTitle);
      setSelectedLevel(selectedLevel);
      setLessons(lessons);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [unitTitle, selectedLevel, lessons]);

  const url = unitTitle
    .toLowerCase()
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .replace(/ /g, '-');

  const materialData = {
    ...material,
    unit: unitTitle,
    level: selectedLevel,
    lessons: lessons,
    url: url,
    image: imgUrl,
  };

  const unitTitleHandler = (event) => {
    if (!isPigSymbol(event.target.value)) {
      setUnitTitle(event.target.value);
    }
    setSaveBtn(true);
  };

  const selectChangeHandler = (event) => {
    setSelectedLevel(event.target.value);
    setSaveBtn(true);
  };

  const createLessonHandler = (lesson) => {
    setLessons((lessons) => [...lessons, lesson]);
  };

  const saveLessonHandler = (index, lesson) => {
    lessons[index].title = lesson.title;
    lessons[index].layout = lesson.layout;
    snackbarShowMessage({
      message: 'Lesson saved',
      severity: 'success',
    });
  };

  const uploadImageHandler = async (event) => {
    const data = new FormData();
    data.append('file', event.target.files[0]);
    try {
      setIsLoading(true);
      const imageUrl = await uploadImage(data);
      setImgUrl(imageUrl);
      setSaveBtn(true);
    } catch (error) {
      return error;
    } finally {
      setIsLoading(false);
    }
  };

  const validation = () => {
    const errors = {
      unitTitleError: !unitTitle.length,
      selectedLevelError: !selectedLevel.length,
    };

    setError((prev) => ({
      ...prev,
      ...errors,
    }));

    return Object.values(errors).includes(true);
  };

  const submitValidate = () => {
    if (!validation()) {
      saveMaterialHandler();
    }
  };

  const saveMaterialHandler = async () => {
    try {
      setIsLoading(true);
      let newMaterial;

      if (create) {
        newMaterial = await createMaterial(materialData);
      } else {
        newMaterial = await updateMaterial(material._id, materialData);
      }

      if (!newMaterial) {
        throw new Error();
      }

      snackbarShowMessage({
        message: 'Material saved',
        severity: 'success',
      });
    } catch (error) {
      snackbarShowMessage({
        message:
          error.response.data.error === 'This material already exist'
            ? error.response.data.error
            : 'Something went wrong',
        severity: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteLessonHandler = (indexOfLesson) => {
    setLessons(
      lessons.filter((lesson, index) => {
        return index !== indexOfLesson;
      }),
    );
  };

  const deleteMaterialHandler = () => {
    try {
      deleteMaterial(material._id);
      navigate('/app/materials', { state: 'delete' });
    } catch (error) {
      return error;
    }
  };

  return (
    <div className={styles.adminForm}>
      <div className={styles.formPart}>
        <Box>
          <FormControl fullWidth margin='normal'>
            <TextField
              size='small'
              id='outlined-name'
              variant='outlined'
              label='Unit name'
              value={unitTitle}
              onChange={unitTitleHandler}
              error={error.unitTitleError}
              helperText={error.unitTitleError ? 'Please fill this field' : ''}
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl
            size='small'
            fullWidth
            margin='normal'
            variant='outlined'
            error={error.selectedLevelError}
          >
            <InputLabel id='levels-select-label'>Level</InputLabel>
            <Select
              labelId='levels-select-label'
              id='levels-select'
              defaultValue=''
              value={selectedLevel}
              onChange={selectChangeHandler}
              label='Level'
            >
              {levels.map((level) => (
                <MenuItem key={level} value={level}>
                  {level}
                </MenuItem>
              ))}
            </Select>
            {error.selectedLevelError && (
              <FormHelperText>Please choose the level of the unit</FormHelperText>
            )}
          </FormControl>
        </Box>
        <Box className={styles.imageUploader}>
          <label htmlFor='upload-image' className={styles.imageWrapper}>
            {isLoading && <ImageSpinner />}
            {material.image && <img src={imgUrl} />}
            {!material.image && !imgUrl && (
              <div className={styles.noImage}>
                <div className={styles.noImageWrapper}>
                  <ImageIcon />
                  <div className={styles.noImageText}>Upload an image to use it for material</div>
                </div>
              </div>
            )}
            {!material.image && imgUrl && <img src={imgUrl} />}
          </label>

          <input
            id='upload-image'
            hidden
            accept='image/*'
            multiple
            type='file'
            onChange={uploadImageHandler}
          />
        </Box>
      </div>
      <div className={styles.formPart}>
        <AdminLessons
          lessons={lessons}
          onCreateLesson={createLessonHandler}
          onSaveLesson={saveLessonHandler}
          onDeleteLesson={deleteLessonHandler}
          onSaveMaterial={submitValidate}
          onLoading={isLoading}
          showSaveBtn={saveBtn}
        />
        {!create && (
          <Button
            className={styles.deleteBtn}
            variant='contained'
            color='error'
            onClick={deleteMaterialHandler}
          >
            Delete material
            <DeleteIcon className={styles.deleteIcon} />
          </Button>
        )}
      </div>
    </div>
  );
};

//propTypes
CreateMaterial.propTypes = {
  material: PropTypes.object,
  levels: PropTypes.array,
  create: PropTypes.string,
  snackbarShowMessage: PropTypes.func,
};

CreateMaterial.defaultProps = {
  material: {},
  levels: [],
  create: '',
};

export default withSnackbar(CreateMaterial);
