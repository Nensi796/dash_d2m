import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Modal,
  OutlinedInput,
  Radio,
  RadioGroup,
  TextareaAutosize,
} from '@mui/material';
import React, { ChangeEvent, useEffect, useState, MouseEvent } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import CloseIcon from '@mui/icons-material/Close';
import { Typography } from '@components';

interface ITemplates {
  id: number;
  message: string;
  subject: string;
}
interface IManageTemplateModal {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  setIsOpenAddModal: (value: boolean) => void;
  setSendNotificationModel: (value: boolean) => void;
  isAddModal: boolean;
  sendNotificationModel: boolean;
  checkedId?: number;
  templateSubjects: ITemplates[];
  getData: (value: ITemplates[]) => void;
  getEditTemplate?: string;
}
const ManageTemplateModal = ({
  isOpen,
  setIsOpen,
  getData,
  isAddModal,
  sendNotificationModel,
  setSendNotificationModel,
  templateSubjects,
  setIsOpenAddModal,
  checkedId,
}: IManageTemplateModal) => {
  const [saveData, setSaveData] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [updateIndex, setUpdateIndex] = useState<number | null>(0);
  console.log('checkedId', checkedId);
  const [notifications, setNotifications] = useState<ITemplates | null>(null);
  const [templates, setTemplates] = useState<ITemplates[]>(templateSubjects);
  const [templateData, setTemplateData] = useState<ITemplates | null>(templateSubjects[0]);

  const handleTemplateChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setTemplateData({ ...templateData, [name]: value, id: Date.now() } as ITemplates);
  };
  const handleNotificationChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setNotifications({ ...(notifications as ITemplates), [name]: value, id: Date.now() });
  };

  useEffect(() => {
    setTemplateData(
      templateSubjects?.find((ele) => ele.id === (checkedId as number)) as ITemplates,
    );
    setUpdateIndex(checkedId as number);
  }, [templateSubjects, checkedId]);

  const handleEditTemplateChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setTemplateData({ ...(templateData as ITemplates), [name]: value });
  };

  const style = {
    maxHeight: '100%',
    overflow: 'auto',
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ITemplates>();

  const onSubmit: SubmitHandler<ITemplates> = () => {
    setTemplates([...(templates as ITemplates[]), templateData] as ITemplates[]);
    getData([...(templates as ITemplates[]), templateData] as ITemplates[]);
    setUpdateIndex(templateData && templateData.id);
    setIsOpenAddModal(false);
  };

  const handleTemplate = () => {
    getData(templates as ITemplates[]);
    setSaveData(true);
    setIsOpen(false);
    setIsEdit(false);
  };

  return (
    <>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        slotProps={{ backdrop: { style: { backgroundColor: 'rgba(0, 0, 0, 0.9)' } } }}>
        <Box sx={style}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton onClick={() => setIsOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box>
            <Typography text="Manage Template" color="#2B388C" fontWeight={600} />
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Box sx={{ background: 'rgba(46, 91, 255, 0.08)', mt: 4, p: 2, height: '100%' }}>
                <Typography text="TEMPLATES" fontWeight={500} />
                <Box
                  sx={{
                    mt: 4,
                    display: 'flex',
                    height: '90%',
                    overflow: 'auto',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}>
                  <FormControl
                    sx={{
                      width: '100%',
                      display: 'flex',
                      '& .MuiFormControlLabel-root': { marginLeft: 0 },
                      minHeight: '400px',
                      height: '95%',
                      overflow: 'auto',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group">
                      {templates?.map((item, index) => {
                        return (
                          <FormControlLabel
                            key={item?.id}
                            value={item?.subject}
                            control={
                              <Radio
                                checked={
                                  updateIndex ? updateIndex === item.id : checkedId === item.id
                                }
                                onChange={(e) => {
                                  console.log('test', e.target);
                                  setUpdateIndex(item.id);
                                  setTemplateData(item);
                                }}
                              />
                            }
                            label={item?.subject}
                          />
                        );
                      })}
                    </RadioGroup>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                      }}>
                      <Button
                        onClick={() => {
                          if (templates) {
                            const updated = templates.filter((item, i) => item.id !== updateIndex);
                            setTemplates(updated);
                            if (updateIndex !== 0) {
                              setTemplateData(templates[0]);
                            } else {
                              setTemplateData(templates[1]);
                            }
                          }
                        }}
                        variant="outlined"
                        sx={{
                          width: '46%',
                          border: '2px solid #FF3D3D !important',
                          color: '#FF3D3D',
                          textTransform: 'capitalize',
                          fontWeight: '900',
                        }}>
                        Remove
                      </Button>{' '}
                      <Button
                        onClick={() => {
                          setTemplateData({
                            id: Date.now(),
                            message: 'Enter Message',
                            subject: 'Enter Subject',
                          });

                          setTemplates([
                            ...templates,
                            {
                              id: Date.now(),
                              message: 'Enter Message',
                              subject: 'Enter Subject',
                            },
                          ]);
                          setUpdateIndex(Date.now());

                          console.log('length', templates);
                        }}
                        variant="outlined"
                        sx={{
                          textTransform: 'capitalize',
                          width: '46%',
                          border: '2px solid #2E5BFF !important',
                          color: '#2E5BFF',
                          fontWeight: '900',
                        }}>
                        Add
                      </Button>
                    </Box>
                  </FormControl>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={8}>
              <Box
                sx={{
                  background: 'rgba(46, 91, 255, 0.08)',
                  mt: 4,
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  // maxHeight: '605px',
                  height: '100%',
                }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}>
                  <Typography text="PREVIEW" fontWeight={500} />
                  <Button
                    onClick={(e: MouseEvent<HTMLButtonElement>) => {
                      console.log('text', (e.target as HTMLElement).innerText);
                      if ((e.target as HTMLElement).innerText === 'Done') {
                        const newList = templates?.map((e, i) => {
                          if (e.id === updateIndex) {
                            return templateData;
                          }
                          return e;
                        });

                        setTemplates(newList as ITemplates[]);

                        setSaveData(true);
                        setIsEdit(false);
                      } else {
                        setIsEdit(true);
                        setSaveData(false);
                      }
                    }}
                    variant="outlined"
                    sx={{
                      ml: '5px',
                      textTransform: 'capitalize',
                      background: 'rgba(46, 91, 255, 0.08)',
                      border: '2px solid #2E5BFF !important',
                      color: '#2E5BFF',
                      fontWeight: '900',
                    }}>
                    {saveData ? 'Edit' : 'Done'}
                  </Button>
                </Box>
                <Typography text="Subject" color="#B0BAC9" fontWeight={500} sx={{ mt: 5 }} />
                {isEdit ? (
                  <>
                    <OutlinedInput
                      defaultValue={templateData && templateData.subject}
                      name="subject"
                      sx={{
                        height: '40px',
                        background: 'rgba(224, 231, 255, 0.2)',
                        border: 0,
                        '& input': { paddingX: '10px', width: '400px' },
                      }}
                      onChange={handleEditTemplateChange}
                    />
                  </>
                ) : (
                  <Typography
                    text={templateData && templateData.subject}
                    color="#2E384D"
                    fontWeight={500}
                    sx={{ mt: 1 }}
                  />
                )}
                <Typography text="Message" color="#B0BAC9" fontWeight={500} sx={{ mt: 5 }} />
                {isEdit ? (
                  <>
                    <TextareaAutosize
                      defaultValue={templateData?.message as string}
                      name="message"
                      minRows={15}
                      aria-label="empty textarea"
                      onChange={(e) => handleEditTemplateChange(e)}
                      style={{
                        maxWidth: 500,
                        width: 510,
                        background: 'transparent',
                        borderRadius: 4,
                        fontWeight: 500,
                        border: 0,
                        fontSize: '18px',
                        fontFamily: 'Roboto","Helvetica","Arial",sans-serif !important',
                      }}
                    />
                  </>
                ) : (
                  <Typography
                    text={templateData?.message as string}
                    color="#2E384D"
                    fontWeight={500}
                    sx={{ mt: 1, height: '100%', overflow: 'auto' }}
                  />
                )}

                <Typography
                  text={`Character Limit : ${templateData?.message?.length}/3000`}
                  color="#2E5BFF"
                />
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 10 }}>
            <Button
              onClick={() => {
                // setUpdateIndex(null);
                setIsOpen(false);
                setSaveData(true);
                setIsEdit(false);
              }}
              variant="outlined"
              sx={{
                textTransform: 'capitalize',
                border: '2px solid #2E5BFF !important',
                color: '#2E5BFF',
                fontWeight: '900',
              }}>
              Cancel
            </Button>
            <Button
              disabled={!saveData}
              variant="contained"
              onClick={handleTemplate}
              sx={{
                ml: '5px',
                textTransform: 'capitalize',
                background: '#2E5BFF !important',
                fontWeight: '900',
              }}>
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
      <Modal
        slotProps={{ backdrop: { style: { backgroundColor: 'rgba(0, 0, 0, 0.9)' } } }}
        open={isAddModal}
        onClose={() => setIsOpenAddModal(false)}>
        <Box sx={{ ...style, width: 420 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton
              onClick={() => {
                // setAddModel(false);
                setIsOpenAddModal(false);
              }}>
              <CloseIcon />
            </IconButton>
          </Box>{' '}
          <Box>
            <Typography text="New Template" color="#2E5BFF" fontSize="20px" />
            <form>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography sx={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>
                  Subject
                </Typography>
                <OutlinedInput
                  {...register('subject', {
                    required: 'Subject is required',
                  })}
                  sx={{
                    height: '40px',
                    background: 'rgba(224, 231, 255, 0.2)',
                    border: '2px solid #E0E7FF',
                    '& input': { paddingX: '10px', width: '400px' },
                  }}
                  onChange={handleTemplateChange}
                />
                {errors.subject && (
                  <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
                    {errors.subject?.message}
                  </Typography>
                )}
              </Box>{' '}
              <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
                <Typography sx={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>
                  Message
                </Typography>

                <TextareaAutosize
                  {...register('message', {
                    required: 'Message is required',
                  })}
                  name="message"
                  minRows={5}
                  aria-label="empty textarea"
                  onChange={handleTemplateChange}
                  style={{
                    maxWidth: 410,
                    width: 410,
                    background: 'rgba(224, 231, 255, 0.2)',
                    border: '2px solid #E0E7FF',
                    borderRadius: 4,
                  }}
                />
                {templateData && templateData.message.split('').length > 6000 && (
                  <Typography text="Character Limit : 0/6000" color="#2E5BFF" />
                )}
                {errors.message && (
                  <Typography role="alert" sx={{ color: 'red', fontSize: '12px' }}>
                    {errors.message?.message}
                  </Typography>
                )}
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, gap: 1 }}>
                <Button
                  onClick={() => {
                    setIsOpenAddModal(false);
                  }}
                  variant="contained"
                  sx={{
                    background: 'rgba(46, 91, 255, 0.08)',
                    color: '#2E5BFF',
                    fontWeight: '900',
                  }}>
                  Reset
                </Button>
                <Button
                  variant="contained"
                  onClick={handleSubmit(onSubmit)}
                  sx={{
                    ml: '5px',
                    background: '#2E5BFF',
                    color: 'white',
                    fontWeight: '900',
                  }}>
                  Save
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Modal>
      <Modal
        open={sendNotificationModel}
        onClose={() => setSendNotificationModel(false)}
        slotProps={{ backdrop: { style: { backgroundColor: 'rgba(0, 0, 0, 0.9)' } } }}>
        <Box sx={{ ...style, width: 420 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton
              onClick={() => {
                setSendNotificationModel(false);
              }}>
              <CloseIcon />
            </IconButton>
          </Box>{' '}
          <Box>
            <Typography
              text="Send Notification to all users"
              color="#2E5BFF"
              fontSize="20px"
              sx={{ mb: 2 }}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography sx={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>
                Subject
              </Typography>
              <OutlinedInput
                name="subject"
                sx={{
                  height: '40px',
                  background: 'rgba(224, 231, 255, 0.2)',
                  border: '2px solid #E0E7FF',
                  '& input': { paddingX: '10px', width: '400px' },
                }}
                onChange={handleNotificationChange}
              />
            </Box>{' '}
            <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
              <Typography sx={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>
                Message
              </Typography>

              <TextareaAutosize
                name="message"
                minRows={5}
                aria-label="empty textarea"
                onChange={handleNotificationChange}
                style={{
                  width: 410,
                  maxWidth: 410,
                  minWidth: 410,
                  background: 'rgba(224, 231, 255, 0.2)',
                  border: '2px solid #E0E7FF',
                  borderRadius: 4,
                }}
              />
              <Typography text="Character Limit : 0/6000" color="#2E5BFF" />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                onClick={() => {
                  setSendNotificationModel(false);
                }}
                variant="contained"
                sx={{
                  background: 'rgba(46, 91, 255, 0.08)',
                  color: '#2E5BFF',
                  fontWeight: '900',
                }}>
                Reset
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  setSendNotificationModel(false);
                }}
                sx={{
                  ml: '5px',
                  background: 'rgba(46, 91, 255, 0.08)',
                  color: '#2E5BFF',
                  fontWeight: '900',
                }}>
                Send
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
export default ManageTemplateModal;
