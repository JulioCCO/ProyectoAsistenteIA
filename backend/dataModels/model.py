# This is a sample Python script.

# Press Shift+F10 to execute it or replace it with your code.
# Press Double Shift to search everywhere for classes, files, tool windows, actions, and settings.
import os
import pickle
import pandas as pd
import warnings

warnings.filterwarnings("ignore", category=UserWarning)


class DataLoader:
    def __init__(self):
        """
        Initializes the dataLoader class.

        This class is responsible for loading machine learning models from
        pickle files and providing methods for making predictions using those models.
        """
        self.models = self.load_models()

    @staticmethod
    def load_models():
        """
        Loads machine learning models from pickle files.

        This method loads machine learning models from pickle files located in
        a specified directory. The models are stored in a dictionary where the
        keys are the model names and the values are the loaded models.

        Returns:
        - loaded_models (dict): Dictionary containing loaded machine learning models.
        """
        # si va a ejecutar solo model no desde el mal debe cambiar la ruta a ..\dataModels\models
        directory_path = r"dataModels/models"
        loaded_models = {}
        for filename in os.listdir(directory_path):
            if filename.endswith('.pkl'):
                model_name = filename.split('.')[0]
                file_path = os.path.join(directory_path, filename)
                with open(file_path, 'rb') as file:
                    loaded_model = pickle.load(file)
                    loaded_models[model_name] = loaded_model
        return loaded_models

    def process_SARIMAX(self, model, input_date):
        """
        Makes predictions using the SARIMAX model.

        This method makes predictions using the SARIMAX model for a specified date.
        It retrieves the model corresponding to the provided model name and uses it
        to predict the value for the given date.

        Parameters:
        - model (str): Name of the SARIMAX model to use for prediction.
        - input_date (str): Date for which the prediction is to be made.

        Returns:
        - predicted_value: Predicted value for the specified date.
        """
        try:
            # Convert the input date to a datetime object
            input_datetime = pd.to_datetime(input_date)

            # Make predictions for the specified date
            pred = self.models[model].get_prediction(start=input_datetime, end=input_datetime, dynamic=False)

            # Extract the predicted value for the specified date
            predicted_value = pred.predicted_mean[input_datetime]

            return predicted_value
        except Exception as e:
            print(f"Error predicting with model '{model}': {e}")
            return None

    def recruitment_prediction(self, ssc_p, hsc_p, degree_p, ssc_b_cat, hsc_b_cat):
        """
        Makes predictions using the reclutamiento model.

        This method makes predictions using the recluitment model based on the input ssc_p, hsc_p, degree_p, ssc_b_cat, hsc_b_cat.
        Parameters:
        - ssc_p (float): Percentage of Secondary Education -10th Grade.
        - hsc_p (float): Percentage of Higher Secondary Education - Grade 12.
        - degree_p (float): Grade Percentage.
        - ssc_b_cat (int(0 , 1)): Board of education ( 0 Central/1 others)
        - hsc_b_cat (int(0 , 1)): Board of education ( 0 Central/1 others)

        Returns:
        - Predicted probability that a student will be placed in a job (True for high, False for low).
        """
        try:
            # Create a DataFrame with the input data
            input_data = pd.DataFrame({
                'ssc_p': [ssc_p],
                'hsc_p': [hsc_p],
                'degree_p': [degree_p],
                'ssc_b_cat': [ssc_b_cat],
                'hsc_b_cat': [hsc_b_cat]
            })

            # Make predictions using the trained model
            prediction = self.models['reclutamiento'].predict(input_data)

            # Return True if prediction is equal to 1, otherwise return False
            return bool(prediction[0])  # Convert 1 or 0 to True or False

        except Exception as e:
            print(f"Error predicting with model 'stroke': {e}")
            return None

    def heart_prediction(self, age, trtbps, thalachh, exng, oldpeak, slp):
        """
        Makes predictions using the heart model.

        This method makes predictions using the heart model based on the input age, trtbps, thalachh, exng, oldpeak,slp.
        Parameters:
        - age (int): Patient age.
        - trtbps (int): resting blood pressure (in mm Hg) 94-200
        - thalachh (int): maximum heart rate reached 71-202
        - exng (int(0 1)): exercise-induced angina (1 = yes; 0 = no)
        - oldpeak (float): exercise-induced ST segment depression on electrocardiogram (ECG) 0-9
        - slp (int(0 1 2)): type of ST segment slope during exercise

        Returns:
        - Predicted probability that a person will have a heart attack (True for high, False for low).
        """
        try:
            # Create a DataFrame with the input data
            input_data = pd.DataFrame({
                'age': [age],
                'trtbps': [trtbps],
                'thalachh': [thalachh],
                'exng': [exng],
                'oldpeak': [oldpeak],
                'slp': [slp]
            })

            # Make predictions using the trained model
            prediction = self.models['heart'].predict(input_data)

            # Return True if prediction is equal to 1, otherwise return False
            return bool(prediction[0])  # Convert 1 or 0 to True or False

        except Exception as e:
            print(f"Error predicting with model 'stroke': {e}")
            return None

    def wine_prediction(self, density, alcohol, volatile_acidity, free_sulfur_dioxide):
        """
        Makes predictions using the heart model.

        This method makes predictions using the wine model based on the input density, alcohol, volatile_acidity, free_sulfur_dioxide.
        Parameters:
        - density (float): Wine density (g/cm³).
        - alcohol(float): Percentage of alcohol by volume in wine.
        - volatile_acidity (float): Volatile acidity of wine, the amount of acetic acid in the form of acetic acid (g/dm³)
        - free_sulfur_dioxide (float): Free sulfur dioxide in wine (mg/dm³).1-289

        Returns:
        - original_label (str): Predicted label for the wine quality.
        """
        try:
            # Create a DataFrame with the input data
            input_data = pd.DataFrame({
                'volatile acidity': [volatile_acidity],
                'density': [density],
                'alcohol': [alcohol],
                'free sulfur dioxide': [free_sulfur_dioxide]
            })

            # Make predictions using the trained model
            prediction_encoded = self.models['wine'].predict(input_data)

            # Define mapping dictionary to map encoded values to original labels
            label_mapping = {0: 'Bad', 1: 'Good', 2: 'Regular'}

            # Get the original label corresponding to the predicted encoded value
            original_label = label_mapping[prediction_encoded[0]]

            return original_label
        except Exception as e:
            print(f"Error predicting with model 'wine': {e}")
            return None

    def stroke_prediction(self, ever_married, age):
        """
        Makes predictions using the stroke model.

        This method makes predictions using the stroke model based on the input age, ever_married

        Parameters:
        - age (int): Age of the patient.
        - ever_married (int 1 0):  Has the patient ever been married?

        Returns:
        - prediction (bool): Predicted likelihood of stroke (True for high, False for low).
        """
        try:
            # Create a DataFrame with the input data
            input_data = pd.DataFrame({
                'ever_married': [ever_married],
                'age': [age]
            })

            # Make predictions using the trained model
            prediction = self.models['stroke'].predict(input_data)

            # Return True if prediction is equal to 1, otherwise return False
            return bool(prediction[0])  # Convert 1 or 0 to True or False

        except Exception as e:
            print(f"Error predicting with model 'stroke': {e}")
            return None

    def mood_prediction(self, days_indoors, social_weakness, mental_health_history, work_interest, growing_stress,
                        occupation, changes_habits):
        """
        Makes predictions using the mood model.

        This method makes predictions using the mood model based on the inputs days_indoors, social_weakness,
        mental_health_history, work_interest, growing_stress,occupation and changes_habits

        Parameters:
        - days_indoors (int): number of days that the person stay indoors.
        - social_weakness (int 0 1 2):  the person has social weakness?
        - mental_health_history (int 0 1 2): the person has a mental health history?
        - work_interest (int 0 1 2): the person has work interest?
        - growing_stress (int 0 1 2): the person has growing stress?
        - occupation (int 0 1 2 3 4): the occupation of the person
        - changes_habits (int 0 1 2): the person changes habits?
        Returns:
        - prediction (string): Predicted likelihood of stroke (low,medium,high).
        """
        try:
            # Create a DataFrame with the input data
            input_data = pd.DataFrame({
                'Occupation': [occupation],
                'Days_Indoors': [days_indoors],
                'Growing_Stress': [growing_stress],
                'Changes_Habits': [changes_habits],
                'Mental_Health_History': [mental_health_history],
                'Work_Interest': [work_interest],
                'Social_Weakness': [social_weakness]



            })

            # Make predictions using the trained model
            prediction_encoded = self.models['mood'].predict(input_data)

            # Define mapping dictionary to map encoded values to mood labels
            label_mapping = {0: 'Cambios de humor altos', 1: 'Cambios de humor bajos', 2: 'Cambios de humor medios'}

            # Get the mood label corresponding to the predicted encoded value
            prediction = label_mapping[prediction_encoded[0]]
            return prediction

        except Exception as e:
            print(f"Error predicting with model 'mood': {e}")
            return None

    def flight_prediction(self, airline, departure_time, stops, arrival_time, class_var, duration, days_left):
        """
        Makes predictions using the flight model.

        This method makes predictions using the flight model based on the inputs airline, departure_time, stops,
        arrival_time, class_var, duration, days_left

        Parameters:
        - airline (int 0 1 2 3 4 5): airline of the flight
        - departure_time (int 0 1 2 3 4 5):  time of departure
        - stops (0 1 2): number of the flight stops
        - arrival_time (0 1 2 3 4 5): time when the flight arrives
        - class_var (int 0 1): type of seat class
        - duration (int): duration of the flight
        - days_left (int): days left to the flight date
        Returns:
        - prediction (float): Predicted price of the ticket.
        """
        try:
            # Create a DataFrame with the input data
            input_data = pd.DataFrame({
                'airline': [airline],
                'departure_time': [departure_time],
                'stops': [stops],
                'arrival_time': [arrival_time],
                'class': [class_var],
                'duration': [duration],
                'days_left': [days_left]
            })

            # Make predictions using the trained model
            prediction = self.models['flight'].predict(input_data)

            # Return prediction value of the ticket price
            return prediction[0]

        except Exception as e:
            print(f"Error predicting with model 'flight': {e}")
            return None

    def titanic_prediction(self, pclass, sex, age, sibsp, parch, fare, embarked):
        """
        Makes predictions using the titanic model.

        This method makes predictions using the titanic model based on the inputs pclass, sex, age, sibsp, parch,
        fare, embarked

        Parameters:
        - pclass (int 1 2 3): class of the passenger
        - sex (int 0 1):  time of departure
        - age (int): age of the passenger
        - sibsp (int): number of siblings or spouses traveling with the passenger.
        - parch (int): number of parents or children traveling with the passenger.
        - fare (float): fare of the passenger ticket
        - embarked (int 1 2 3): port from which the passenger embarked
        Returns:
        - prediction (boolean): if passenger survived True or not False
        """
        try:
            # Create a DataFrame with the input data
            input_data = pd.DataFrame({
                'Pclass': [pclass],
                'Sex': [sex],
                'Age': [age],
                'SibSp': [sibsp],
                'Parch': [parch],
                'Fare': [fare],
                'Embarked': [embarked]
            })

            # Make predictions using the trained model
            prediction = self.models['titanic'].predict(input_data)

            # Return True if prediction is equal to 1, otherwise return False
            return bool(prediction[0])  # Convert 1 or 0 to True or False

        except Exception as e:
            print(f"Error predicting with model 'titanic': {e}")
            return None

    def salary_prediction(self, age, gender, job_title, education_level, years_of_experience):
        """
        Makes predictions using the salary model.

        This method makes predictions using the salary model based on the inputs age, gender, job_title,
        education_level, years_of_experience


        Parameters:
        - age (float): age of the employee
        - gender (int 0 1):  sex of the employee
        - job_title (int 0-173): title of the employee job
        - education_level (int 0 1 2): number of siblings or spouses traveling with the passenger.
        - years_of_experience (float): number of parents or children traveling with the passenger.
        Returns:
        - prediction (float): amount of employee's salary
        """
        try:
            # Create a DataFrame with the input data
            input_data = pd.DataFrame({
                'Age': [age],
                'Gender': [gender],
                'Job Title': [job_title],
                'Education Level': [education_level],
                'Years of Experience': [years_of_experience],
            })

            # Make predictions using the trained model
            prediction = self.models['Salary'].predict(input_data)

            # Return prediction value of the ticket price
            return prediction[0]

        except Exception as e:
            print(f"Error predicting with model 'salary': {e}")
            return None

    def bank_prediction(self, complain, age, num_of_products, balance, is_active_member, credit_score):
        """
        Makes predictions using the bank model.

        This method makes predictions using the bank model based on the inputs complain, age, num_of_products, balance,
        is_active_member, credit_score


        Parameters:
        - complain (int 0 1): if the client complain about the bank or not
        - age (int): client's age
        - num_of_products (int 0-173): refers to the number of products a customer has purchased through the bank.
        - balance (float): balance in customer's account
        - is_active_member (int 0 1): the customer is an active member?
        - credit_score (int)  customer credit score
        Returns:
        - prediction (float): amount of employee's salary
        """
        try:
            # Create a DataFrame with the input data
            input_data = pd.DataFrame({
                'CreditScore': [credit_score],
                'Age': [age],
                'Balance': [balance],
                'NumOfProducts': [num_of_products],
                'IsActiveMember': [is_active_member],
                'Complain': [complain],
            })

            # Make predictions using the trained model
            prediction = self.models['Bank'].predict(input_data)

            # Return True if prediction is equal to 1, otherwise return False
            return bool(int(prediction[0]))  # Convert 1 or 0 to True or False

        except Exception as e:
            print(f"Error predicting with model 'bank': {e}")
            return None


if __name__ == "__main__":
    # Create an instance of the dataLoader class
    data_loader = DataLoader()

    # Avocado
    avocado_prediction = data_loader.process_SARIMAX('avocado', '2016-01-01')
    print("Avocado Prediction:", avocado_prediction)
    # Test the recruitment_prediction method
    recruitment_prediction = data_loader.recruitment_prediction(80, 65, 90, 1, 0)
    print("Recruitment Prediction:", recruitment_prediction)
    # Test the heart_prediction method
    heart_prediction = data_loader.heart_prediction(60, 65, 101, 1, 2.2, 1)
    print("Heart Prediction:", heart_prediction)
    # Test the wine_prediction method
    wine_prediction = data_loader.wine_prediction(0.5, 0.99, 12.3, 110)
    print("Wine Prediction:", wine_prediction)
    # Test the stroke_prediction method
    stroke_prediction = data_loader.stroke_prediction(1, 50)
    print("Stroke Prediction:", stroke_prediction)
    mood_prediction = data_loader.mood_prediction(0, 2, 1, 1,2,3,1)
    print("Mood Prediction: ", mood_prediction)
    titanic_prediction = data_loader.titanic_prediction(3, 2, 34, 1,0, 8.0193, 1)
    print("Titanic Prediction: ", titanic_prediction)
    flight_prediction = data_loader.flight_prediction(1, 3, 0, 4, 1,9.58, 29)
    print("Flight Prediction: ", flight_prediction)
    bank_prediction = data_loader.bank_prediction(0, 23, 3, 79583.98,
                                                  1, 890)
    print("Bank Prediction: ", bank_prediction)
    salary_prediction = data_loader.salary_prediction(29.0, 0, 56, 0, 2.0)
    print("Salary Prediction: ", salary_prediction)
