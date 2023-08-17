import {
  Box,
  Button,
  FormControlLabel,
  Modal,
  OutlinedInput,
  Radio,
  RadioGroup,
  Typography,
  FormControl,
} from '@mui/material';
import React, { useMemo, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useLazyQuery } from '@apollo/client';
import GET_ALL_OFFICES from '@graphql/schema/getAllOffice.graphql';
import GET_USERS_BY_ROLES from '@graphql/schema/getUserByRole.graphql';
import { get } from 'react-hook-form';
import { useRouter } from 'next/router';
import { IOffice, IStaffDetails } from '@types';
interface IMetaTitle {
  title: string;
  openSearchModal: boolean;
  setOpenSearchModal: (value: boolean) => void;
}
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  borderRadius: '4px',
  boxShadow: 24,
  p: 2,
};

const SearchModal = ({ title, openSearchModal, setOpenSearchModal }: IMetaTitle) => {
  const router = useRouter();
  const [displayData, setDisplayData] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState('');
  const [office, setOffice] = useState<string>('');
  const [staff, setStaff] = useState<string>('');

  const [getOffice, { data, loading }] = useLazyQuery(GET_ALL_OFFICES, {
    fetchPolicy: 'network-only',
  });

  const [getStaff, { data: staffMembers, loading: staffLoading }] = useLazyQuery(
    GET_USERS_BY_ROLES,
    { fetchPolicy: 'network-only' },
  );
  const offices = get(data, 'getAllOffices.nodes', []);
  const staffData = get(staffMembers, 'listUsers.nodes', []);

  const getSearchData = useMemo(() => {
    if (title === 'Search Office') {
      return offices;
    }
    if (title === 'Search Staffs') {
      return staffData.filter((item: IStaffDetails) =>
        item.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()),
      );
    }
  }, [title, searchValue, offices, staffData]);

  const handleSearch = () => {
    if (title === 'Search Office') {
      return getOffice({
        variables: {
          filter: {
            name: searchValue,
          },
          sort: {
            fieldName: null,
            order: null,
          },
        },
      }).then(() => setDisplayData(true));
    }
    if (title === 'Search Staffs') {
      getStaff({ variables: { roles: ['ADMIN', 'ADVISER'] } }).then(() => setDisplayData(true));
    }
    return;
  };

  return (
    <Modal
      slotProps={{ backdrop: { style: { backgroundColor: 'rgba(0, 0, 0, 0.9)' } } }}
      open={openSearchModal}
      onClose={() => setOpenSearchModal(false)}
      aria-labelledby="New Applicant"
      aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography id="modal-modal-title" sx={{ fontSize: '16px', color: '#2B388C' }}>
            {title}
          </Typography>
          <CloseIcon onClick={() => setOpenSearchModal(false)} />
        </Box>
        <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px' }}>
            Enter Details
          </label>
          <OutlinedInput
            value={searchValue}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setSearchValue(event.target.value);
            }}
            placeholder="David Corry"
            sx={{
              height: '40px',
              marginBottom: '5px',
              background: 'rgba(224, 231, 255, 0.2)',
              border: '2px solid #E0E7FF',
              '& input': { paddingX: '10px' },
            }}
          />

          <Button
            variant="outlined"
            onClick={handleSearch}
            sx={{
              textTransform: 'capitalize',
              color: '#2E5BFF !important',
              border: '2px solid #2E5BFF !important',
              borderRadius: '4px !important',
              fontWeight: 800,
              width: '100%',
            }}>
            Search
          </Button>
        </Box>

        <Box
          sx={{
            width: 'auto',
            height: '218px',
            background: '#2E5BFF14',
            marginTop: '20px',
            padding: '10px',
          }}>
          {displayData && searchValue && (
            <FormControl sx={{ width: '80%', margin: 'auto' }}>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group">
                {getSearchData?.map((item: any, index: number) => {
                  return (
                    <FormControlLabel
                      key={item?.id}
                      value={item?.name}
                      control={
                        <Radio
                          checked={
                            item.name.toLocaleLowerCase() === searchValue.toLocaleLowerCase()
                          }
                          onChange={(e) => {
                            setSearchValue(e.target.value);
                            if (
                              offices.map((item: IOffice) => item.name).includes(e.target.value) ||
                              e.target.checked
                            ) {
                              setOffice(item.id);
                            }
                            if (
                              staffData.map((item: any) => item.name).includes(e.target.value) ||
                              e.target.checked
                            ) {
                              setStaff(item.id);
                            }
                          }}
                        />
                      }
                      label={item?.name}
                    />
                  );
                })}
              </RadioGroup>
            </FormControl>
          )}
        </Box>

        <Box
          sx={{
            marginTop: '20px',
            display: 'flex',
            flexDirection: 'row',
            gap: '8px',
            justifyContent: 'flex-end',
          }}>
          <Button
            variant="contained"
            onClick={() => {
              setSearchValue('');
              setDisplayData(false);
              setOpenSearchModal(false);
            }}
            sx={{
              textTransform: 'capitalize',
              backgroundColor: '#E0E7FF !important',
              color: '#2E5BFF !important',
              borderRadius: '4px !important',
              padding: '4px !important',
              fontWeight: 800,
            }}>
            Cancel
          </Button>
          <Button
            disabled={!displayData}
            variant="contained"
            onClick={() => {
              setSearchValue('');
              setDisplayData(false);
              if (office && title === 'Search Office') {
                router.push(`/office/${office}`);
              }
              if (staff && title === 'Search Staffs') {
                router.push(`/staff/${staff}`);
              }
              setOpenSearchModal(false);
            }}
            sx={{
              opacity: !displayData ? 0.5 : 1,
              textTransform: 'capitalize',
              backgroundColor: '#2E5BFF !important',
              color: 'white !important',
              padding: '4px !important',
              borderRadius: '4px !important',
              fontWeight: 800,
            }}>
            Confirm
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
export default SearchModal;
