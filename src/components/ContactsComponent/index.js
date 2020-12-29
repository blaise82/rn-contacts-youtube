import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import colors from '../../assets/theme/colors';
import {CREATE_CONTACT} from '../../constants/routeNames';
import AppModal from '../common/AppModal';
import Icon from '../common/Icon';
import Message from '../common/Message';
import styles from './styles';

const ContactsComponent = ({modalVisible, data, loading, setModalVisible}) => {
  const {navigate} = useNavigation();
  const ListEmptyComponent = () => {
    return (
      <View style={{paddingVertical: 100, paddingHorizontal: 100}}>
        <Message info message="No contacts to show" />
      </View>
    );
  };

  const renderItem = ({item}) => {
    const {
      contact_picture,
      first_name,
      country_code,
      phone_number,
      last_name,
    } = item;

    return (
      <TouchableOpacity style={styles.itemContainer}>
        <View style={styles.item}>
          {contact_picture ? (
            <Image
              style={{width: 45, height: 45, borderRadius: 100}}
              source={{uri: contact_picture}}
            />
          ) : (
            <View
              style={{
                width: 45,
                height: 45,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.grey,
                borderRadius: 100,
              }}>
              <Text style={[styles.name, {color: colors.white}]}>
                {first_name[0]}
              </Text>
              <Text style={[styles.name, {color: colors.white}]}>
                {last_name[0]}
              </Text>
            </View>
          )}

          <View style={{paddingLeft: 20}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.name}>{first_name}</Text>

              <Text style={styles.name}> {last_name}</Text>
            </View>
            <Text
              style={
                styles.phoneNumber
              }>{`${country_code} ${phone_number}`}</Text>
          </View>
        </View>
        <Icon name="right" type="ant" size={18} color={colors.grey} />
      </TouchableOpacity>
    );
  };
  return (
    <>
      <View style={{backgroundColor: colors.white, flex: 1}}>
        <AppModal
          modalFooter={<></>}
          modalBody={
            <View>
              <Text>Hello</Text>
            </View>
          }
          title="My Profile!"
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
        />

        {loading && (
          <View style={{paddingVertical: 100, paddingHorizontal: 100}}>
            <ActivityIndicator color={colors.primary} size="large" />
          </View>
        )}

        {!loading && (
          <View style={[{paddingVertical: 20}]}>
            <FlatList
              renderItem={renderItem}
              data={data}
              ItemSeparatorComponent={() => (
                <View
                  style={{height: 0.5, backgroundColor: colors.grey}}></View>
              )}
              keyExtractor={(item) => String(item.id)}
              ListEmptyComponent={ListEmptyComponent}
              ListFooterComponent={<View style={{height: 150}}></View>}
            />
          </View>
        )}
      </View>

      <TouchableOpacity
        style={styles.floatingActionButton}
        onPress={() => {
          navigate(CREATE_CONTACT);
        }}>
        <Icon name="plus" size={21} color={colors.white} />
      </TouchableOpacity>
    </>
  );
};

export default ContactsComponent;