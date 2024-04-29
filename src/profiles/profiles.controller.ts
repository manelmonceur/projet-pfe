import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './schemas/profile.schema';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ParentGuard } from 'src/guards/parent.guard';

@UseGuards(ParentGuard)
//@UseGuards(AuthGuard)
@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) { }

  //  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.profilesService.create(createProfileDto);
  }

  //for picture upload
  @Post('upload-picture')
  @UseInterceptors(
    FileInterceptor('picture', {
      storage: diskStorage({
        destination: './uploads',
      }),
      fileFilter: (req, file, cb) => {
        // Check if the uploaded file is an image
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          // Reject the file if it's not an image
          return cb(
            new Error(
              'Only image files with extensions .jpg, .jpeg, .png, and .gif are allowed',
            ),
            false,
          );
        }

        // Accept the file if it's an image
        cb(null, true);
      },
    }),
  ) //whitout this inspector the file was lost in the transit we were never able to capture this file

  /*When applied to a parameter in a route handler method, the @UploadedFile() decorator instructs NestJS to inject the uploaded file data into that parameter. This allows you to access and process the uploaded file within your route handler.*/
  /*When you use the @UploadedFile() decorator without an interceptor, NestJS doesn't have a mechanism to automatically parse and attach the uploaded files to the request object. As a result, the file parameter in your route handler won't be populated with the uploaded file data, and you won't be able to access it.*/
  async uploadProfilePicture(@UploadedFile() picture: Express.Multer.File) {
    console.log(picture);
    //return this.profilesService.uploadProfilePicture(picture);
  }

  @Get()
  findAll() {
    return this.profilesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profilesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profilesService.update(id, updateProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profilesService.remove(id);
  }


  @Get('user-profiles/:id')
  async findProfilesByUser(@Param('id') id): Promise<Profile[]> {
    const userId = id; // Assuming user ID is available in the request object
    return this.profilesService.findAllByUser(userId);
  }
}
