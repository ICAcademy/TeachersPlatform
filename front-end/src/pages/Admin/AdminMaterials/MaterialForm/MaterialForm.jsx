import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

//Components
import AdminLessons from './AdminLessons/AdminLessons';

//Services
import {
  createMaterial,
  deleteMaterial,
  updateMaterial,
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

const CreateMaterial = ({ material, levels, create }) => {
  const [unitTitle, setUnitTitle] = useState(material.unit || '');
  const [selectedLevel, setSelectedLevel] = useState(material.level || '');
  const [lessons, setLessons] = useState(material.lessons);
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
  };

  const unitTitleHandler = (event) => {
    setUnitTitle(event.target.value);
  };

  const selectChangeHandler = (event) => {
    setSelectedLevel(event.target.value);
  };

  const createLessonHandler = (lesson) => {
    setLessons((lessons) => [...lessons, lesson]);
  };

  const saveLessonHandler = (index, lesson) => {
    lessons[index].title = lesson.title;
    lessons[index].layout = lesson.layout;
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
      if (create) {
        setIsLoading(true);
        await createMaterial(materialData);
        setIsLoading(false);
      } else {
        await updateMaterial(material._id, materialData);
      }
    } catch (error) {
      console.log(error);
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
      navigate('/app/materials');
    } catch (error) {
      console.log(error);
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
          {material.image && (
            <label htmlFor='upload-image' className={styles.imageWrapper}>
              <img src={`http://localhost:5000/uploads/${material.image}`} />
            </label>
          )}
          {!material.image && (
            <label htmlFor='upload-image' className={styles.imageWrapper}>
              <div className={styles.noImage}>
                <div className={styles.noImageWrapper}>
                  <ImageIcon />
                  <div className={styles.noImageText}>Upload an image to use it for material</div>
                </div>
              </div>
            </label>
          )}
          <Button variant='contained' component='label'>
            Upload
            <input id='upload-image' hidden accept='image/*' multiple type='file' />
          </Button>
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
};

CreateMaterial.defaultProps = {
  material: {},
  levels: [],
  create: '',
};

export default CreateMaterial;
