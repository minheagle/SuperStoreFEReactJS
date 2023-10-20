import { call, put, takeLatest } from "redux-saga/effects";
import {
  addNewChat,
  addNewChatSuccess,
  addNewChatFailure,
  getAllChat,
  getAllChatSuccess,
  getAllChatFailure,
  findChat,
  findChatSuccess,
  findChatFailure,
  addMessage,
  addMessageSuccess,
  addMessageFailure,
  getAllMessage,
  getAllMessageSuccess,
  getAllMessageFailure,
} from "../../slice/chat/chat.slice";
import chatApi from "../../api/chat/chat.api";

function* addNewChatSaga(action) {
  try {
  } catch (error) {}
}

function* getAllChatSaga(action) {
  try {
    const { userId } = action.payload;
    const response = yield call(chatApi.getAllChat, userId);
    yield put(getAllChatSuccess(response.data));
  } catch (error) {
    yield put(getAllChatFailure(error.message));
  }
}

function* findChatSaga(action) {
  try {
  } catch (error) {}
}

function* addMessageSaga(action) {
  try {
    const { chatId, senderId, text, callback } = action.payload;
    const response = yield call(chatApi.sendMessage, chatId, senderId, text);
    // console.log(response);
    yield callback.getNewMessage(response.data);
    yield put(addMessageSuccess(response));
  } catch (error) {
    yield put(addMessageFailure(error.message));
  }
}

function* getAllMessageSaga(action) {
  try {
    const { chatId } = action.payload;
    const response = yield call(chatApi.receiveMessage, chatId);
    yield put(getAllMessageSuccess(response.data));
  } catch (error) {
    yield put(getAllMessageFailure(error.message));
  }
}

function* chatSaga() {
  yield takeLatest(addNewChat, addNewChatSaga);
  yield takeLatest(getAllChat, getAllChatSaga);
  yield takeLatest(findChat, findChatSaga);
  yield takeLatest(addMessage, addMessageSaga);
  yield takeLatest(getAllMessage, getAllMessageSaga);
}

export default chatSaga;
