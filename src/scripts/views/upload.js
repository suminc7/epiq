import {} from '../common/global';
import * as uploadMovie from './upload/upload.video';
import * as uploadForm from './upload/upload.form';
import Emitter from 'es6-event-emitter';



const emitter = new Emitter();
uploadForm.setEmitter(emitter);
uploadMovie.setEmitter(emitter);
