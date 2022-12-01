// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router';

// // import AnswerPicker from 'components/AnswerPicker/AnswerPicker';

// import { getDataByUrl } from 'services/questions';

// const Quiz = () => {
//   const [topic, setTopic] = useState({});
//   const [isLoading, setIsLoading] = useState(false);

//   const { url } = useParams();

//   const getMaterialData = async (url) => {
//     try {
//       setIsLoading(true);
//       const topicData = await getDataByUrl(url);
//       setTopic(topicData);
//       setIsLoading(false);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getMaterialData(url);
//   }, [url]);

//   return (
//     <div className={styles.materials}>
//       {/* {!isLoading && topic != '' && (
//         <Lessons level={topic.level} unit={topic.unit} lessons={topic.lessons} />
//       )}
//       {isLoading && <Loader />} */}
//     </div>
//   );
// };

// export default Quiz;

// // <List subheader={<ListSubheader sx={{ fontSize: '32px' }}>Questions</ListSubheader>}>
// // {quiz}
// // </List>

// // const [questionList, setQuestionList] = useState([]);
// //   const { topic } = useParams();

// //   const fetchQuestions = async (topic) => {
// //     const [data] = await getQuizByTopic({ topic });
// //     setQuestionList(data.questions);
// //   };

// //   useEffect(() => {
// //     fetchQuestions(topic);
// //   }, [topic]);

// //   const quiz = questionList.map((question, i) => (
// //     <ListItem
// //       divider
// //       key={question._id}
// //       sx={{ display: 'flex', justifyContent: 'space-between', py: '15px' }}
// //     >
// //       <Typography variant='body1'>{`${i + 1}. ${question.title}`}</Typography>
// //       <AnswerPicker id={question._id} options={question.answers} />
// //     </ListItem>
// //   ));
